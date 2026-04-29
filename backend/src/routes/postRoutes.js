import express from "express";
import {
  getCreatePostPage,
  getGroupPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  getFeedPage,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", getFeedPage);
router.get("/create", getCreatePostPage);
router.post("/create", createPost);
router.get("/group/:groupId", getGroupPosts);
router.get("/:postId", getPostById);
router.post("/:postId/delete", deletePost);
router.put("/:postId", updatePost);

export default router;