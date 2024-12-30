import mongoose from "mongoose";

// Define the OTP schema
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String, // OTP value (could be a string or number)
      required: true
    },
    email: {
      type: String, // The email or phone number to which OTP was sent
      required: true
    },
    createdAt: {
      type: Date, // Timestamp for when the OTP is generated
      default: Date.now
    }
  },
  {
    // Automatically create `createdAt` field for TTL
    timestamps: true
  }
);

// Set the TTL index for the OTP to expire after 5 minutes (300 seconds)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Create the model from the schema
const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
