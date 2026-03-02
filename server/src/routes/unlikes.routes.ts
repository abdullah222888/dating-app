import express from "express";
import { userUnlikeList, userUnlikes } from "../controllers/unlike.controller";

const router = express.Router();

router.post("/unlike", userUnlikes);
router.get("/unlikelist/:user_id", userUnlikeList);
module.exports = router;
