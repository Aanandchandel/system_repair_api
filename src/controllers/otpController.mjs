import OTP from "../models/OTP.mjs"; // Import the OTP model
import sendEmail from "../services/sendMail.mjs"; // Import the sendEmail utility

// Generate and Send OTP
export const generateAndSendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP to the database
    const newOTP = new OTP({ otp, email });
    await newOTP.save();

    // Send the OTP via email
    const emailMessage = `Your OTP is: ${otp}. It is valid for 5 minutes.`;
    const emailStatus = await sendEmail(email, emailMessage);

    res.status(200).json({
      success: true,
      message: "OTP generated and sent successfully.",
      emailStatus,
    });
  } catch (error) {
    console.error("Error generating and sending OTP:", error);
    res.status(500).json({ success: false, message: "Error generating and sending OTP.", error });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    // Find the OTP in the database
    const existingOTP = await OTP.findOne({ email, otp });
    

    if (!existingOTP) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    // OTP is valid; delete it after verification
    await OTP.deleteOne({ _id: existingOTP._id });

    res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP.", error });
  }
};
