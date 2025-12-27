import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateReguest.js";
import { authSchema } from "../validators/authValidators.js";

const router = express.Router();


router.post("/register", validateRequest(authSchema), register);
router.post("/login", validateRequest(authSchema), login);
router.post("/logout", logout);



export default router;