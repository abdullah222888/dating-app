import express from "express";
import {
  createPolicies,
  getPolicies,
} from "../controllers/privacyPolicy.controller";
const router = express.Router();

router.post("/privacyPolicy", createPolicies);
router.get("/allPolicies", getPolicies);

module.exports = router;
