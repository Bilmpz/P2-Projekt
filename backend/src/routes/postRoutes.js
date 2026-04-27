import express from "express";
import {
  getCreatePostPage,
  getGroupPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import loadUserGroups from "../middleware/LoadUserGroups.js";

const router = express.Router();

// Protected routes — kræver login
router.get("/create", authMiddleware, loadUserGroups, getCreatePostPage);
router.post("/create", authMiddleware, createPost);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, updatePost);

// Public routes
router.get("/group/:groupId", getGroupPosts);
router.get("/:postId", getPostById);

export default router;