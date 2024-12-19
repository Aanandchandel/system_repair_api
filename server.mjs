import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
const app = express();



//routes
app.get("/", (req, res) => {
    res.send("hello")
})

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