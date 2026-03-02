import express from "express";
import { createLike, getAllLikes } from "../controllers/like.controller";

const router = express.Router();

router.post("/like", createLike);
router.get("/allLikes", getAllLikes);

module.exports = router;
