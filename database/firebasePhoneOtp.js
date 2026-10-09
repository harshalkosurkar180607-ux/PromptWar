/**
 * Firebase Native 6-Digit SMS OTP Authentication
 * 
 * Uses Firebase Authentication's built-in SMS gateway to deliver a real 6-digit OTP code to mobile numbers.
 */

import { auth } from "./firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

let confirmationResultCache = null;

/**
 * Initialize Firebase invisible or visible Recaptcha Verifier
 * @param {string} containerId - DOM element ID for the recaptcha container or button
 */
export function setupRecaptcha(containerId = "recaptcha-container") {
  if (typeof window === "undefined") return null;

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved - will allow signInWithPhoneNumber
      },
    });
  }
  return window.recaptchaVerifier;
}

/**
 * Send 6-digit OTP to mobile phone number directly via Firebase SMS
 * @param {string} phoneNumber - Full phone number with country code (e.g., +919876543210)
 * @param {RecaptchaVerifier} [appVerifier]
 */
export async function sendFirebasePhoneOtp(phoneNumber, appVerifier) {
  try {
    const verifier = appVerifier || setupRecaptcha();
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    confirmationResultCache = confirmationResult;

    return {
      success: true,
      message: `Firebase 6-digit SMS OTP sent to ${phoneNumber}`,
      confirmationResult,
    };
  } catch (error) {
    console.error("Firebase sendFirebasePhoneOtp error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Verify 6-digit OTP code submitted by user
 * @param {string} otpCode - 6-digit numeric OTP code
 * @param {Object} [customConfirmationResult]
 */
export async function verifyFirebasePhoneOtp(otpCode, customConfirmationResult) {
  try {
    const confirmation = customConfirmationResult || confirmationResultCache;
    if (!confirmation) {
      return {
        success: false,
        error: "No pending phone verification found. Please request an OTP first.",
      };
    }

    const userCredential = await confirmation.confirm(otpCode.trim());
    confirmationResultCache = null;

    return {
      success: true,
      user: userCredential.user,
      message: "Phone number verified successfully with Firebase!",
    };
  } catch (error) {
    console.error("Firebase verifyFirebasePhoneOtp error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  setupRecaptcha,
  sendFirebasePhoneOtp,
  verifyFirebasePhoneOtp,
};
