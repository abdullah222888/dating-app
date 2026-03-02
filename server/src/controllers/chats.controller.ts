// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createChat = async (req: Request, res: Response) => {
  const { id, match_id, participant_one, participant_two } = req.body;
  const chatExists = await prisma.chat.findFirst({
    where: { id },
  });
  if (!chatExists) {
    return res.json({ message: "Chat room already exists" });
  }
  try {
    const chat = await prisma.chat.create({
      data: {
        match_id,
        participant_one,
        participant_two,
      },
    });
    res.status(201).json({ message: "Chat room created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};
