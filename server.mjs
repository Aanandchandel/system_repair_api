import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();



// Middleware setup
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS



//routes
app.get("/", (req, res) => {
    res.send("hello")
})

app.use('/api', userRoutes);

//connect to DB
connectDb()
const PORT = process.env.PORT || 3000

app.use((err, req, res, next) => {


    res.status(err.statusCode || 500).json({
        message: err.status || "internal server error",
        error: err.message || "internal server error"

    })

})
app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})