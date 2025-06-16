import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (Admin/Teacher/Student/Parent)
// @access  Public (use protect+isAdmin if only Admin can register)
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post("/login", login);

export default router;