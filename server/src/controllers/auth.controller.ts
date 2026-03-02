import { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

import { genSaltSync, hashSync } from "bcrypt-ts";
import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as jwt from "jsonwebtoken";

const privateKey = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, phone_no } = req.body;
  if (!username || !email || !password) {
    return res.send({ message: "All fields are required" });
  }
  const existingEmail = await prisma.user.findFirst({
    where: { email },
  });
  if (existingEmail) {
    return res.status(400).json({ message: "email already exists" });
  }
  try {
    const salt = genSaltSync(10);
    const hashedPassword = await hashSync(password, salt);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone_no,
      },
    });
    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration Failed", error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(500).json({ message: "invalid password" });
    }
    if (!privateKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const userWithRole = user as any;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userWithRole.role,
      },
      privateKey,
      {
        expiresIn: "7d",
      },
    );
    res.status(200).json({ message: "logged in successfully", user, token });
    // res.send(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to logged in" });
  }
};
