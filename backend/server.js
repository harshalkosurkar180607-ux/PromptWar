import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Root Health Check Route
app.get("/", (req, res) => {
  res.json({
    name: "Promptwar Backend API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      sendOtp: "POST /api/auth/send-otp",
      verifyOtp: "POST /api/auth/verify-otp",
      health: "GET /api/auth/health",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Promptwar Backend Server is running on http://localhost:${PORT}`);
  console.log(`📡 OTP Endpoint: POST http://localhost:${PORT}/api/auth/send-otp\n`);
});

export default app;
