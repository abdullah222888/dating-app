import express from "express";
import {
  allGuidelines,
  createGuideline,
} from "../controllers/guidelines.controller";
const router = express.Router();

router.post("/guidelines", createGuideline);
router.get("/allGuidelines", allGuidelines);

module.exports = router;
