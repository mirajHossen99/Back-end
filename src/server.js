import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";


config();
connectDB();

const app = express();
const PORT = 5001;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// API Routes
app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)
app.use("/watchlist", watchlistRoutes)



//-------------- Read data APIs ---------------

app.get("/hello", (req, res) => {
    res.json({ message: "Hello World"});
})




 const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});


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

