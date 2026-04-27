import express, { Router } from "express";

const router = express.Router();

router.get("/", getAllGroups);

export default router;