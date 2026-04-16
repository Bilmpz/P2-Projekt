import express, { Router } from "express";
import { getAllGroups } from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getAllGroups);

router.get("/", (req, res) => {
  console.log("HIT /groups");
  res.send("works");
});

export default router;