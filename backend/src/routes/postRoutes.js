import express, { Router } from "express";
import {
  getCreatePostPage,
  getGroupPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/create", getCreatePostPage);
router.post("/create", createPost);

router.get("/group/:groupId", getGroupPosts);
router.get("/:postId", getPostById);

// Protected routes
router.post("/group/:groupId", authMiddleware, createPost);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, updatePost);

export default router;