import express from "express";
import {
  getGroupPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/group/:groupId", getGroupPosts);
router.get("/:postId", getPostById);

// Protected routes
router.post("/group/:groupId", authMiddleware, createPost);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, updatePost);

export default router;