import express from "express";
import { addToWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();


router.post("/", addToWatchlist);



export default router;