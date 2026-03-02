// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";
const sendEmail = require("../utils/email");

const prisma = new PrismaClient();

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.send({
        message: "We could'nt find the user with the given Email",
        user,
      });
    }
    const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword`;
    const message = `We have sent you the verification link for resetting your password. Please use the below link ot reset your password\n\n${resetUrl}`;
    await sendEmail({
      email: email,
      subject: "Email reset Link",
      message: message,
    });
    res.status(200).json({
      message: "Password Reset link was sent to the user email",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
