import express from "express";
import { 
    addMovie, 
    allMovies, 
    removeMovie, 
    updateMovie 
} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", allMovies);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", removeMovie);




export default router;