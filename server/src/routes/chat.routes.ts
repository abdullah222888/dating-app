import { fetch_conversations } from "../controllers/chats.controller";

const express = require("express");
const router = express.Router();

router.get("/conversations/:user_id", fetch_conversations);

module.exports = router;
