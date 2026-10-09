import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// In-memory fallback cache when Firestore admin credentials are not yet initialized
const memoryStore = new Map();

// Dynamic loader for Firebase Admin to avoid hard dependency crash
let adminDbInstance = null;
async function getAdminDb() {
  if (adminDbInstance) return adminDbInstance;
  try {
    const { adminDb, isAdminConfigured } = await import("../../database/firebaseAdmin.js");
    if (!isAdminConfigured) return null;
    adminDbInstance = adminDb;
    return adminDbInstance;
  } catch {
    return null;
  }
}

/**
 * Generate a cryptographically secure 6-digit OTP
 */
export function generateNumericOTP(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}

/**
 * Hash an OTP using SHA-256
 */
export function hashOTP(otp, email) {
  return crypto
    .createHash("sha256")
    .update(`${email.toLowerCase().trim()}:${otp}`)
    .digest("hex");
}

/**
 * Save an OTP record (Firestore with In-Memory fallback)
 */
export async function saveOTP({ email, otp, expiryMinutes = 5 }) {
  const normalizedEmail = email.toLowerCase().trim();
  const hashedOtp = hashOTP(otp, normalizedEmail);
  const now = Date.now();
  const expiresAt = now + expiryMinutes * 60 * 1000;

  const otpData = {
    email: normalizedEmail,
    hashedOtp,
    createdAt: now,
    expiresAt,
    attempts: 0,
    verified: false,
  };

  // Always update memory store
  memoryStore.set(normalizedEmail, otpData);

  // Try storing in Cloud Firestore
  try {
    const adminDb = await getAdminDb();
    if (adminDb) {
      await adminDb.collection("otps").doc(normalizedEmail).set({
        ...otpData,
        createdAt: new Date(now),
        expiresAt: new Date(expiresAt),
      });
    }
  } catch (err) {
    console.warn("⚠️  Firestore saveOTP skipped (using memory store):", err.message);
  }

  return { email: normalizedEmail, expiresAt };
}

/**
 * Get active OTP record
 */
export async function getOTP(email) {
  const normalizedEmail = email.toLowerCase().trim();

  // Try Firestore first
  try {
    const adminDb = await getAdminDb();
    if (adminDb) {
      const doc = await adminDb.collection("otps").doc(normalizedEmail).get();
      if (doc.exists) {
        const data = doc.data();
        return {
          ...data,
          expiresAt: data.expiresAt?.toDate ? data.expiresAt.toDate().getTime() : data.expiresAt,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().getTime() : data.createdAt,
        };
      }
    }
  } catch {
    // Fall back to memoryStore
  }

  return memoryStore.get(normalizedEmail) || null;
}

/**
 * Update attempts count for brute-force protection
 */
async function incrementAttempts(email, currentAttempts) {
  const normalizedEmail = email.toLowerCase().trim();
  const newAttempts = currentAttempts + 1;

  if (memoryStore.has(normalizedEmail)) {
    const item = memoryStore.get(normalizedEmail);
    item.attempts = newAttempts;
  }

  try {
    const adminDb = await getAdminDb();
    if (adminDb) {
      await adminDb.collection("otps").doc(normalizedEmail).update({
        attempts: newAttempts,
      });
    }
  } catch {
    // Ignore update error
  }
}

/**
 * Invalidate/Delete OTP after successful verification
 */
export async function invalidateOTP(email) {
  const normalizedEmail = email.toLowerCase().trim();
  memoryStore.delete(normalizedEmail);

  try {
    const adminDb = await getAdminDb();
    if (adminDb) {
      await adminDb.collection("otps").doc(normalizedEmail).delete();
    }
  } catch {
    // Ignore delete error
  }
}

/**
 * Verify submitted OTP against stored hash
 */
export async function verifyOTP({ email, enteredOtp }) {
  const normalizedEmail = email.toLowerCase().trim();
  const record = await getOTP(normalizedEmail);

  if (!record) {
    return {
      valid: false,
      reason: "No active OTP found. Please request a new OTP.",
    };
  }

  const now = Date.now();
  const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS || "5", 10);

  // Check brute force attempts
  if (record.attempts >= maxAttempts) {
    await invalidateOTP(normalizedEmail);
    return {
      valid: false,
      reason: "Too many failed attempts. This OTP has expired. Please request a new one.",
    };
  }

  // Check expiration
  if (now > record.expiresAt) {
    await invalidateOTP(normalizedEmail);
    return {
      valid: false,
      reason: "OTP has expired. Please request a new OTP.",
    };
  }

  // Verify Hash
  const enteredHash = hashOTP(enteredOtp.trim(), normalizedEmail);
  if (enteredHash !== record.hashedOtp) {
    await incrementAttempts(normalizedEmail, record.attempts);
    const remaining = maxAttempts - (record.attempts + 1);
    return {
      valid: false,
      reason: `Incorrect OTP code. ${remaining > 0 ? `${remaining} attempts remaining.` : "OTP invalidated."}`,
    };
  }

  // Success: Invalidate OTP so it cannot be re-used
  await invalidateOTP(normalizedEmail);

  return {
    valid: true,
    email: normalizedEmail,
    verifiedAt: new Date(),
  };
}

export default {
  generateNumericOTP,
  saveOTP,
  getOTP,
  verifyOTP,
  invalidateOTP,
};
