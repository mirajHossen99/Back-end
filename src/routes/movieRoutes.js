import express from "express";
import { 
    addMovie, 
    allMovies, 
    removeMovie, 
    updateMovie 
} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateReguest.js";
import { createMovieSchema, updateMovieSchema } from "../validators/movieValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", allMovies);
router.post("/", validateRequest(createMovieSchema), addMovie);
router.put("/:id", validateRequest(updateMovieSchema), updateMovie);
router.delete("/:id", removeMovie);




export default router;