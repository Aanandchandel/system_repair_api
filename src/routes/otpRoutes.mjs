import express from "express";
import { generateAndSendOTP, verifyOTP } from "../controllers/otpController.mjs";

const router = express.Router();

// Route to generate and send OTP
router.post("/generate", generateAndSendOTP);

// Route to verify OTP
router.post("/verify", verifyOTP);

export default router;
