import express from 'express';

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = 5001;


// API Routes
app.use("/movies", movieRoutes)




//-------------- Read data APIs ---------------

app.get("/hello", (req, res) => {
    res.json({ message: "Hello World"});
})



// GET, POST, PUT, DELETE
// AUTH - signin, signup














app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})