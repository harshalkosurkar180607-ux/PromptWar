import { sendFirebaseEmailLink } from "./firebaseEmailAuth.js";
import dotenv from "dotenv";

dotenv.config();

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.log("\nUsage: node test-email-auth.js <your-email@example.com>");
  console.log("Example: node test-email-auth.js test@gmail.com\n");
  process.exit(0);
}

console.log(`\n🚀 Sending Firebase sign-in link to: ${targetEmail}...`);

sendFirebaseEmailLink(targetEmail, "http://localhost:5000")
  .then((result) => {
    if (result.success) {
      console.log("✅ SUCCESS! Firebase has dispatched the authentication email directly from Google servers.");
      console.log("📬 Check your inbox (or Spam folder) for the sign-in email from Firebase.\n");
    } else {
      console.error("❌ Failed to send:", result.error);
    }
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
