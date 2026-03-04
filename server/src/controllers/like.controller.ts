import express, { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createLike = async (req: Request, res: Response) => {
  const { sender, receiver } = req.body;
  try {
    // check like exists
    // if like exists then create a match
    // if like doesnt exist then create like
    // user cannot send like to himself

    const check_sender_like = await prisma.like.findFirst({
      where: {
        liked_by: sender,
        liked_to: receiver,
      },
    });

    if (check_sender_like) {
      return res.status(401).json({
        message: "you have already liked this user",
      });
    } else {
      const check_receiver_like = await prisma.like.findFirst({
        where: {
          liked_by: receiver,
          liked_to: sender,
        },
      });

      if (check_receiver_like) {
        const check_match = await prisma.match.findFirst({
          where: {
            OR: [
              { user_one: sender, user_two: receiver },
              { user_one: receiver, user_two: sender },
            ],
          },
        });
        if (check_match) {
          return res.status(401).json({ message: "match already exists" });
        } else {
          await prisma.like.create({
            data: {
              liked_by: sender,
              liked_to: receiver,
            },
          });

          const new_match = await prisma.match.create({
            data: {
              user_one: sender,
              user_two: receiver,
            },
          });
          const new_chat = await prisma.chat.create({
            data: {
              match_id: new_match.id,
              participant_one: sender,
              participant_two: receiver,
            },
          });
          return res.status(201).json({
            match: new_match,
            chat: new_chat,
          });
        }
      } else {
        const new_like = await prisma.like.create({
          data: {
            liked_by: sender,
            liked_to: receiver,
          },
        });
        return res.status(201).json(new_like);
      }
    }
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
