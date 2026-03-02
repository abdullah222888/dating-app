import express, { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createMatch = async (req: Request, res: Response) => {
  const { id, user_one, user_two, chat_id } = req.body;
  try {
    if (!user_one || !user_two) {
      return res.status(400).json({
        message: "Both user_one and user_two must be provided",
      });
    }
    //check if both users liked each other
    const userOneExists = await prisma.user.findUnique({
      where: { id: user_one },
    });
    const userTwoExists = await prisma.user.findUnique({
      where: { id: user_two },
    });
    if (!userOneExists || !userTwoExists) {
      return res
        .status(400)
        .json({ message: "Both users must exist to create a match" });
    }

    //check if match already made for both users
    const matchExists = await prisma.match.findFirst({
      where: {
        OR: [
          { user_one, user_two },
          { user_one: user_two, user_two: user_one },
        ],
      },
    });
    if (matchExists) {
      return res.status(400).json({ message: "Match already exists" });
    }
    //if not made then create the match for two users
    const usersMatched = await prisma.match.create({
      data: {
        user_one,
        user_two,
        chat_id,
      },
    });
    res
      .status(201)
      .json({ message: "Match of two users created", usersMatched });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
