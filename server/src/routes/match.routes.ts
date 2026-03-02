import { createMatch } from "../controllers/match.controller";

const express = require("express");
const router = express.Router();

router.post("/match", createMatch);

module.exports = router;
