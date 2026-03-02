import express, { Request, Response } from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  // updateUser,
} from "../controllers/users.controller";
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizedRoutes = require("../middlewares/roleMiddleware");

//only admin can access this route

router.get(
  "/admin",
  verifyToken,
  authorizedRoutes("ADMIN"),
  (req: Request, res: Response) => {
    res.json({ message: "hello admin" });
  }
);
//both admin and user can access this route
router.get(
  "/user",
  verifyToken,
  authorizedRoutes("ADMIN", "USER"),
  (req: Request, res: Response) => {
    res.json({ message: "hello user" });
  }
);

//Get all users route
router.get("/allUsers", getUsers);
router.get("/user/:id", getUserById);
router.delete("/user/delete/:id", deleteUser);
// router.put("/user/update", updateUser);

module.exports = router;
