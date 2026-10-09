import dotenv from "dotenv";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log("\n==========================================");
console.log("   PROMPTWAR FIREBASE CONFIG CHECK");
console.log("==========================================\n");

const envPath = path.resolve(__dirname, ".env");
const hasEnvFile = existsSync(envPath);

console.log(`[1] .env File: ${hasEnvFile ? "FOUND" : "NOT FOUND (Copy from .env.example)"}`);

const clientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

console.log("\n[2] Client SDK Keys Status:");
Object.entries(clientConfig).forEach(([key, val]) => {
  const isSet = val && !val.includes("your_");
  console.log(`  - ${key.padEnd(28)} : ${isSet ? "CONFIGURED" : "MISSING or PLACEHOLDER"}`);
});

console.log("\n[3] Admin SDK Status:");
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";
const resolvedServiceAccount = path.isAbsolute(serviceAccountPath)
  ? serviceAccountPath
  : path.resolve(__dirname, serviceAccountPath);

const hasServiceAccountFile = existsSync(resolvedServiceAccount);
const hasAdminEnvVars = Boolean(
  process.env.FIREBASE_ADMIN_PROJECT_ID &&
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
  process.env.FIREBASE_ADMIN_PRIVATE_KEY
);

if (hasServiceAccountFile) {
  console.log(`  - Service Account File    : FOUND at ${resolvedServiceAccount}`);
} else if (hasAdminEnvVars) {
  console.log("  - Admin Environment Vars  : CONFIGURED (Cloud env vars)");
} else {
  console.log(`  - Service Account File    : NOT FOUND (Place serviceAccountKey.json in database/ folder)`);
}

console.log("\n------------------------------------------");
if (!hasEnvFile && !hasServiceAccountFile) {
  console.log("NEXT STEPS:");
  console.log("1. Copy '.env.example' to '.env'");
  console.log("2. Fill in your Firebase Project credentials from Firebase Console");
  console.log("3. (Optional) Download serviceAccountKey.json from Firebase Console for Admin access");
} else {
  console.log("Ready to connect!");
}
console.log("==========================================\n");
