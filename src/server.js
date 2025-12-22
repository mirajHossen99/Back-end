import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";

config();
connectDB();

const app = express();
const PORT = 5001;


// API Routes
app.use("/movies", movieRoutes)




//-------------- Read data APIs ---------------

app.get("/hello", (req, res) => {
    res.json({ message: "Hello World"});
})







app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})


// Handle uncaught promise Rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exception
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception: ", err);
    await disconnectDB();
    process.exit(1);
})

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
})

