import express, { Router } from "express";
import { getGroupsPage, joinGroup, leaveGroup } from "../controllers/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getGroupsPage);
router.post("/:groupId/join", authMiddleware, joinGroup)
router.post("/:groupId/leave", authMiddleware, leaveGroup)

export default router;