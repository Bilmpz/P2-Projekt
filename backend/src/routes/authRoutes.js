import express from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import loadUserGroups from "../middleware/LoadUserGroups.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, loadUserGroups, getProfile);
router.post("/profile/update", authMiddleware, updateProfile);

export default router;