import express from "express";
import { generateNumericOTP, saveOTP, getOTP, verifyOTP } from "../services/otpService.js";
import { sendOTPEmail } from "../services/emailService.js";

const router = express.Router();

// Helper to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email.trim());
}

/**
 * POST /api/auth/send-otp
 * Body: { email: string }
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "A valid email address is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limiting: Check if an active OTP was created recently (< 60 seconds)
    const existingOtp = await getOTP(normalizedEmail);
    const cooldownSeconds = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS || "60", 10);
    if (existingOtp && existingOtp.createdAt) {
      const secondsSinceLast = (Date.now() - existingOtp.createdAt) / 1000;
      if (secondsSinceLast < cooldownSeconds) {
        const waitTime = Math.ceil(cooldownSeconds - secondsSinceLast);
        return res.status(429).json({
          success: false,
          error: `Please wait ${waitTime} seconds before requesting another code.`,
        });
      }
    }

    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || "5", 10);
    const otp = generateNumericOTP(6);

    // Save to Firestore / Memory
    await saveOTP({ email: normalizedEmail, otp, expiryMinutes });

    // Send email
    const emailResult = await sendOTPEmail({
      to: normalizedEmail,
      otp,
      expiryMinutes,
    });

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${normalizedEmail}`,
      expiresInMinutes: expiryMinutes,
      previewUrl: emailResult.previewUrl || null,
    });
  } catch (error) {
    console.error("Error in /send-otp:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while sending OTP.",
    });
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { email: string, otp: string }
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "A valid email address is required.",
      });
    }

    if (!otp || typeof otp !== "string" || otp.trim().length !== 6) {
      return res.status(400).json({
        success: false,
        error: "A valid 6-digit OTP code is required.",
      });
    }

    const result = await verifyOTP({ email, enteredOtp: otp });

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        error: result.reason,
      });
    }

    // Connect to Firebase Authentication: Create user & mint Custom Auth Token
    let firebaseCustomToken = null;
    let firebaseUid = null;

    try {
      const { adminAuth, isAdminConfigured } = await import("../../database/firebaseAdmin.js");
      if (isAdminConfigured && adminAuth) {
        let firebaseUser;
        try {
          firebaseUser = await adminAuth.getUserByEmail(normalizedEmail);
        } catch (err) {
          if (err.code === "auth/user-not-found") {
            firebaseUser = await adminAuth.createUser({
              email: normalizedEmail,
              emailVerified: true,
            });
          }
        }

        if (firebaseUser) {
          firebaseUid = firebaseUser.uid;
          firebaseCustomToken = await adminAuth.createCustomToken(firebaseUser.uid);
        }
      }
    } catch (firebaseErr) {
      console.warn("⚠️  Firebase Auth token generation skipped:", firebaseErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! Welcome to Promptwar.",
      email: result.email,
      firebaseUid,
      firebaseCustomToken,
      verifiedAt: result.verifiedAt,
    });
  } catch (error) {
    console.error("Error in /verify-otp:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while verifying OTP.",
    });
  }
});

/**
 * GET /api/auth/health
 */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Promptwar OTP Auth Service",
    timestamp: new Date().toISOString(),
  });
});

export default router;
