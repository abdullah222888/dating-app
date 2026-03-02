import { loginUser, registerUser } from "../controllers/auth.controller";
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
