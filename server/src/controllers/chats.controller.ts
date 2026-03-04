// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const createChat = async (req: Request, res: Response) => {
  const { participant_one, participant_two } = req.body;

  // check if match exists
  const check_match = await prisma.match.findFirst({
    where: {
      OR: [
        {
          user_one: participant_one,
          user_two: participant_two,
        },
        {
          user_one: participant_two,
          user_two: participant_one,
        },
      ],
    },
  });

  if (!check_match) {
    return res.status(401).json({ message: "Match doesnt exist" });
  }

  // check if chat exists
  const chatExists = await prisma.chat.findFirst({
    where: {
      OR: [
        { participant_one, participant_two },
        { participant_one: participant_two, participant_two: participant_one },
      ],
    },
  });
  if (!chatExists) {
    return res.status(401).json({ message: "Chat room already exists" });
  }
  try {
    const chat = await prisma.chat.create({
      data: {
        participant_one,
        participant_two,
        match_id: check_match.id,
      },
    });
    res.status(201).json({ message: "Chat room created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};

const fetch_conversations = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const chat_data = await prisma.chat.findMany({
      where: {
        OR: [{ participant_one: user_id }, { participant_two: user_id }],
      },
      select: {
        id: true,
        createdAt: true,
        // We include the objects, but NOT the raw participant_one / participant_two string IDs
        participantOne: {
          select: { id: true, username: true },
        },
        participantTwo: {
          select: { id: true, username: true },
        },
      },
    });
    res.status(200).json(chat_data);
  } catch (error) {
    return res.status(500).json({
      messaage: "internal server error",
    });
  }
};

export { createChat, fetch_conversations };
