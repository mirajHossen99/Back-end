import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateReguest.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

const router = express.Router();


router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);



export default router;