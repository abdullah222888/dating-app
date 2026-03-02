import express, { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const userUnlikes = async (req: Request, res: Response) => {
  const { unliked_by, unliked_to } = req.body;
  try {
    const saveUnlike = await prisma.unlike.create({
      data: {
        unliked_by,
        unliked_to,
      },
    });
    res
      .status(201)
      .json({ message: `Unliked user ${unliked_to} successfully`, saveUnlike });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const userUnlikeList = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const data = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        unlikesGiven: true,
      },
    });
    if (!data) {
      return res.json({ message: "No user found" });
    }
    res.status(200).json({ message: `Unlike list of user ${user_id}`, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// export const removeUnlike = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   try {
//     const data = await prisma.unlike.delete({
//         data:{

//         }
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };
