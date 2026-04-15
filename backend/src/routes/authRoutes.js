import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/register", registerUser);
router.route("/login", loginUser);

export default router;