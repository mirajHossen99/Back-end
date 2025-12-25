import express from "express";
import {
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateReguest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

// router.post("/", authMiddleware, addToWatchlist);
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;
