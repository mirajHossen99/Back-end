import express from "express";
import {  } from "../controllers/";

const router = express.Router();


router.post("/", addToWatchlist);
router.post("/login", login);
router.post("/logout", logout);



export default router;