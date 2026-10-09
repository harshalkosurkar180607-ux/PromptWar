import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let testTransporter = null;

/**
 * Creates or retrieves the email transporter
 */
async function getTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const resendApiKey = process.env.RESEND_API_KEY;
  const brevoApiKey = process.env.BREVO_API_KEY;
  const genericApiKey = process.env.EMAIL_API_KEY;

  // 1. Resend API Key
  if (resendApiKey && !resendApiKey.includes("your_")) {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: resendApiKey,
      },
    });
  }

  // 2. Brevo API Key
  if (brevoApiKey && !brevoApiKey.includes("your_")) {
    return nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser || process.env.BREVO_USER || "apikey",
        pass: brevoApiKey,
      },
    });
  }

  // 3. Gmail or standard SMTP with User & Password / App Password / Email API Key
  const activePassword = emailPass || genericApiKey;
  const isRealAccountConfigured =
    emailUser &&
    activePassword &&
    !emailUser.includes("your_") &&
    !activePassword.includes("your_");

  if (isRealAccountConfigured) {
    // Production / Configured SMTP (e.g., Gmail)
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: emailUser,
        pass: activePassword,
      },
    });
  }

  // Fallback for development: Use Nodemailer Ethereal test account
  if (!testTransporter) {
    console.log("ℹ️  No real SMTP credentials found. Creating Nodemailer test account for local testing...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      testTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.warn("⚠️  Could not create Ethereal account, falling back to console-only mode:", err.message);
      testTransporter = null;
    }
  }

  return testTransporter;
}

/**
 * Generate a modern, responsive HTML email template for Promptwar OTP
 */
function buildOtpEmailHtml({ otp, expiryMinutes }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promptwar Verification Code</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 520px; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.4);">
            <!-- Header -->
            <tr>
              <td style="padding: 32px 32px 20px 32px; text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);">
                <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">⚔️ PROMPTWAR</h1>
                <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 14px;">AI Prompt Battle Arena</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #f8fafc; text-align: center;">Verify Your Email Address</h2>
                <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                  Use the one-time verification code below to authenticate your account and enter the Promptwar arena.
                </p>

                <!-- OTP Code Display -->
                <div style="background-color: #0f172a; border: 2px dashed #6366f1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                  <div style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #38bdf8; font-family: monospace;">
                    ${otp}
                  </div>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8;">
                    ⏱️ Code expires in <strong>${expiryMinutes} minutes</strong>
                  </p>
                </div>

                <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.5; color: #cbd5e1; text-align: center;">
                  If you did not request this verification code, please ignore this email or contact support.
                </p>
                
                <div style="border-top: 1px solid #334155; margin-top: 24px; padding-top: 20px; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    🔒 Never share your verification code with anyone. Promptwar staff will never ask for it.
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Send OTP via Email
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.otp - 6-digit OTP code
 * @param {number} [options.expiryMinutes=5] - Expiration time in minutes
 * @returns {Promise<{ success: boolean, messageId?: string, previewUrl?: string }>}
 */
export async function sendOTPEmail({ to, otp, expiryMinutes = 5 }) {
  const transporter = await getTransporter();
  const from = process.env.EMAIL_FROM || '"Promptwar" <no-reply@promptwar.com>';

  const mailOptions = {
    from,
    to,
    subject: `[Promptwar] Your Verification Code is ${otp}`,
    text: `Your Promptwar verification code is: ${otp}. It will expire in ${expiryMinutes} minutes. Do not share this code with anyone.`,
    html: buildOtpEmailHtml({ otp, expiryMinutes }),
  };

  if (transporter) {
    try {
      const info = await transporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);

      console.log(`\n📧 [EMAIL SENT] To: ${to} | Code: ${otp}`);
      if (previewUrl) {
        console.log(`🔗 [ETHEREAL PREVIEW URL] ${previewUrl}\n`);
      }

      return {
        success: true,
        messageId: info.messageId,
        previewUrl: previewUrl || null,
      };
    } catch (error) {
      console.error("❌ Failed to send email via transporter:", error.message);
      // Fallback: log to console so local testing is never blocked
      console.log(`🔑 [CONSOLE FALLBACK] OTP for ${to}: ${otp}`);
      return { success: true, fallback: true, error: error.message };
    }
  } else {
    // Console fallback if no network/SMTP transporter
    console.log(`\n🔑 [MOCK EMAIL] To: ${to} | OTP: ${otp} (Expires in ${expiryMinutes}m)\n`);
    return { success: true, fallback: true };
  }
}

export default {
  sendOTPEmail,
};
