/**
 * Firebase Native Passwordless Email Sign-In
 * 
 * This uses Firebase Authentication's built-in email service.
 * ZERO third-party SMTP or email API keys needed — Firebase sends the emails directly!
 */

import { auth } from "./firebase.js";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

/**
 * Send passwordless sign-in email directly via Firebase's built-in email servers
 * @param {string} email - Recipient email
 * @param {string} [redirectUrl] - The URL to return to after user clicks the link
 */
export async function sendFirebaseEmailLink(email, redirectUrl = "http://localhost:5000/auth/callback") {
  const actionCodeSettings = {
    url: redirectUrl,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save email locally to complete sign-in when they click the email link
    if (typeof window !== "undefined") {
      window.localStorage.setItem("emailForSignIn", email);
    }
    return {
      success: true,
      message: `Authentication link sent to ${email} directly via Firebase servers.`,
    };
  } catch (error) {
    console.error("Firebase sendSignInLinkToEmail error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Verify and complete sign-in when the user clicks the link from their email
 * @param {string} [email] - The user's email address (if not provided, reads from localStorage)
 * @param {string} [currentUrl] - Current page URL containing the action code
 */
export async function verifyFirebaseEmailLink(email, currentUrl = window?.location?.href) {
  try {
    if (!isSignInWithEmailLink(auth, currentUrl)) {
      return { success: false, error: "The provided URL is not a valid Firebase sign-in link." };
    }

    let userEmail = email;
    if (!userEmail && typeof window !== "undefined") {
      userEmail = window.localStorage.getItem("emailForSignIn");
    }

    if (!userEmail) {
      return { success: false, error: "Please provide your email to confirm sign-in." };
    }

    const result = await signInWithEmailLink(auth, userEmail, currentUrl);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("emailForSignIn");
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error("Firebase signInWithEmailLink error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  sendFirebaseEmailLink,
  verifyFirebaseEmailLink,
};
