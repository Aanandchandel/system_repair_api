import express from "express";
import connectDb from "./src/config/mongoDbConfig.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import otpRoutes from "./src/routes/otpRoutes.mjs";
import serviceRoutes from "./src/routes/ServiceRoutes.mjs";
import brandRoutes from "./src/routes/brandRoutes.mjs";
import modelRoutes from "./src/routes/modelRoutes.mjs";
import seriesRoutes from "./src/routes/seriesRoutes.mjs";
import serviceDealRoutes from "./src/routes/serviceDealRoutes.mjs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS

// Root route
app.get("/", (req, res) => {
    res.send("Hello! API is running.");
});

// Connect application routes
app.use('/api/brand', brandRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/service-deals', serviceDealRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.status || "Internal Server Error",
        error: err.message || "Something went wrong!",
    });
});

// Connect to MongoDB
connectDb();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
