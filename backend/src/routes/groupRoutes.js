import express, { Router } from "express";
import { getGroupsPage, joinGroup } from "../controllers/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGroupsPage);
router.post("/:groupId/join", authMiddleware, joinGroup)

export default router;