import express, { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const blocklist = async (req: Request, res: Response) => {
  const { blocker_id, blocked_user_id } = req.body;

  try {
    const blockUser = await prisma.blocklist.create({
      data: {
        blocker_id,
        blocked_user_id,
      },
    });

    // const addBlock = await prisma.user.create({
    //     data:{

    //     }
    // })
    res.status(201).json({ message: "User Blocked Sucessfully", blockUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getBlockListByID = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const blockDetails = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        blockerList: true,
      },
    });
    if (!blockDetails) {
      return res.json({ message: "No user found", blockDetails });
    }
    res.status(200).json({ blocked_Users: "Blocklist of user", blockDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error });
  }
};

export const removeBlock = async (req: Request, res: Response) => {
  const { blocker_id, blocked_user_id } = req.body;
  try {
    const deleted = await prisma.blocklist.deleteMany({
      where: {
        blocker_id,
        blocked_user_id,
      },
    });
    res
      .status(200)
      .json({
        message: "User Unblocked Successfully",
        deleted,
        blocked_user_id,
        blocker_id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server error", error });
  }
};
