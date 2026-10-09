# Firebase Database Setup for Promptwar

This folder contains the Firebase (Cloud Firestore) configuration, security rules, and schemas for **Promptwar**.

---

## 📁 Directory Structure

```text
database/
├── .env                  # Your active Firebase credentials
├── .env.example          # Template for Firebase credentials
├── firebase.js           # Client SDK configuration (Firestore & Auth)
├── firebaseAdmin.js      # Admin SDK configuration (Backend privileged access)
├── firebaseEmailAuth.js  # Firebase Native Email Link Auth (No SMTP needed!)
├── firebasePhoneOtp.js   # Firebase Native 6-Digit SMS OTP Auth
├── schema.js             # Collections & data model definitions (including otps)
├── firestore.rules       # Security rules for Firestore
├── firebase.json         # Firebase CLI configuration
├── firestore.indexes.json# Custom query indexes
├── test-connection.js    # Health-check script for configuration
└── package.json          # Database dependencies & scripts
```

---

## 🚀 Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it `Promptwar` (or your preferred name).
3. Disable or enable Google Analytics (optional) and click **Create Project**.

### 2. Enable Cloud Firestore
1. In the Firebase console left menu, click **Build** -> **Firestore Database**.
2. Click **Create database**.
3. Choose your database location (e.g., `asia-south1` or nearest region).
4. Choose **Start in test mode** (for rapid development) or **production mode**.
5. Click **Create**.

### 3. Get Client SDK Keys (for Frontend / Web)
1. In Firebase Console, go to **Project Settings** (gear icon ⚙️) -> **General**.
2. Scroll down to **Your apps**, click the Web icon (`</>`), and register your app (e.g. `promptwar-web`).
3. Copy the `firebaseConfig` keys into a `.env` file inside `database/` (based on `.env.example`).

### 4. Get Admin SDK Credentials (for Backend Server)
1. In Firebase Console, go to **Project Settings** -> **Service accounts**.
2. Click **Generate new private key**.
3. Save the downloaded JSON file as `serviceAccountKey.json` inside the `database/` folder.
   *(Note: This file is already excluded in `.gitignore` so it won't be pushed to git).*

---

## 🧪 Testing the Configuration

1. Install dependencies:
   ```bash
   cd database
   npm install
   ```

2. Run the connection check:
   ```bash
   npm run test-connection
   ```

---

## 📦 How to Import in Your Code

### Backend (Node.js / Express):
```javascript
import { adminDb } from "../database/firebaseAdmin.js";
import { COLLECTIONS } from "../database/schema.js";

// Example: Fetch all active battles
const snapshot = await adminDb.collection(COLLECTIONS.BATTLES).where("status", "==", "active").get();
const battles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### Frontend (Client-side / React / Web):
```javascript
import { db } from "../database/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { COLLECTIONS } from "../database/schema.js";

// Example: Fetch prompts
const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROMPTS));
```
