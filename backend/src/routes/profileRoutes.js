import { getProfile, updateProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.get("/profile", authMiddleware, getProfile);
router.post("/profile/update", authMiddleware, updateProfile);