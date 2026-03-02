import {
  createUserDetails,
  deleteUserDetails,
  getAllUserDetail,
  getUserDetailsbyID,
  updateDetails,
} from "../controllers/userDetails.controller";

const express = require("express");
const router = express.Router();

router.post("/create", createUserDetails);
router.get("/allUserDetails", getAllUserDetail);
router.get("/:id", getUserDetailsbyID);
router.delete("/delete/:id", deleteUserDetails);
router.put("/update/:id", updateDetails);

module.exports = router;
