import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET || "hello234s";

const payload = {
  id: "abc123",
  email: "demo@user.com",
};

const token = jwt.sign(payload, secret, { expiresIn: "2d" });

console.log("Generated JWT Token:");
console.log(token);
