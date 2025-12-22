import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
    res.json({message: "hello movie"});


});

export default router;