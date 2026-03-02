import { forgotPassword } from "../controllers/forgotPassword.controller";

const express = require("express");
const router = express.Router();

router.post("/forgotPassword", forgotPassword);

module.exports = router;
