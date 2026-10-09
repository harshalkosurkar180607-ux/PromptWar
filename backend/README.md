# Promptwar Backend - Email OTP System

This backend service provides secure Email OTP (One-Time Password) verification for **Promptwar**.

---

## 🚀 Features

- 🔢 **Cryptographically Secure OTP**: Generates random 6-digit verification codes using Node.js `crypto`.
- 🔒 **SHA-256 Hashing**: Raw OTPs are never stored in plain text.
- ⏱️ **TTL Expiration**: OTPs automatically expire after 5 minutes (configurable).
- 🛡️ **Brute-Force Protection**: Locks out after 5 consecutive incorrect attempts.
- ⏳ **Rate Limiting**: Cooldown period between resend requests (60 seconds).
- 📧 **Beautiful HTML Email Template**: Ready-to-go dark theme styled emails.
- 🧪 **Zero-Setup Local Testing**: Automatically uses Nodemailer Ethereal test inbox and console logging if real SMTP is not yet configured.

---

## 📁 Endpoints

### 1. Send OTP
- **URL**: `POST /api/auth/send-otp`
- **Body**:
  ```json
  {
    "email": "player@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Verification code sent to player@example.com",
    "expiresInMinutes": 5
  }
  ```

---

### 2. Verify OTP
- **URL**: `POST /api/auth/verify-otp`
- **Body**:
  ```json
  {
    "email": "player@example.com",
    "otp": "492817"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Email verified successfully! Welcome to Promptwar.",
    "email": "player@example.com",
    "verifiedAt": "2026-10-08T17:05:00.000Z"
  }
  ```

---

## ⚙️ Configuration (Using Real Gmail)

To send real emails to your inbox via Gmail:

1. Enable **2-Step Verification** on your Google Account: [Google Security Settings](https://myaccount.google.com/security).
2. Go to [App passwords](https://myaccount.google.com/apppasswords).
3. Create an app name (e.g. `Promptwar`) and copy the 16-character generated password.
4. Update `backend/.env`:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

---

## 🧪 Testing

1. Install backend packages:
   ```bash
   cd backend
   npm install
   ```

2. Run the OTP test suite:
   ```bash
   npm run test-otp
   ```

3. Start the Express server:
   ```bash
   npm start
   ```
