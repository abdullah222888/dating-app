import {
  blocklist,
  getBlockListByID,
  removeBlock,
} from "../controllers/userBlocklist.controller";

const express = require("express");
const router = express.Router();

router.post("/blockUser", blocklist);
router.get("/blocklist/:user_id", getBlockListByID);
router.delete("/blocklist/unblock", removeBlock);
module.exports = router;
