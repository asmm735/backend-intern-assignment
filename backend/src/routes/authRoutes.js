import express from "express";
import { register, login, getMe, getAllUsers } from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import { registerValidation, loginValidation } from "../middleware/validators.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Protected routes
router.get("/me", verifyToken, getMe);
router.get("/users", verifyToken, isAdmin, getAllUsers);

export default router;
