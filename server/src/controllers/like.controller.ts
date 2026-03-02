import express, { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createLike = async (req: Request, res: Response) => {
  const { liked_by, liked_to } = req.body;
  console.log("Received Body", req.body);

  try {
    await prisma.like.create({
      data: { liked_by, liked_to },
    });

    const mutualLike = await prisma.like.findFirst({
      where: {
        liked_by: liked_to,
        liked_to: liked_by,
      },
    });

    if (!mutualLike) {
      return res.json({ message: "Like saved! No match Found" });
    }

    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { user_one: liked_by, user_two: liked_to },
          { user_one: liked_to, user_two: liked_by },
        ],
      },
    });
    if (existingMatch) {
      return res.json({ message: "Match Already Exists", existingMatch });
    }

    const chat = await prisma.chat.create({
      data: {
        participant_one: liked_by,
        participant_two: liked_to,
      },
    });

    const match = await prisma.match.create({
      data: {
        user_one: liked_by,
        user_two: liked_to,
        chat_id: chat.id,
      },
    });

    return res.json({ message: "Match Created Successfully", match });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Insternal Server Error", error });
  }
};

export const getAllLikes = async (req: Request, res: Response) => {
  try {
    const likes = await prisma.like.findMany({});
    res.status(200).json({ message: "All Likes", likes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
