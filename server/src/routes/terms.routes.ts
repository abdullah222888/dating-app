import express from "express";
import { createTerms, getTerms } from "../controllers/terms.controller";
const router = express.Router();

router.post("/terms", createTerms);
router.get("/allTerms", getTerms);

module.exports = router;
