import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (email, message) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            service: "gmail", // Use your email service provider
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email, // Receiver's email
            subject: "Hello from Node.js Emailer!", // Subject line
            text: message, // Plain text body
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return "Email sent successfully!";
    } catch (error) {
        console.error("Error sending email:", error);
        return "Failed to send email.";
    }
};

export default sendEmail;
