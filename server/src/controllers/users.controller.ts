// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({ message: "All Users", allUsers });
    console.log(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userById = await prisma.user.findFirst({
      where: { id },
    });
    res.status(200).json({ message: "successfull", userById });
    console.log(userById);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "user Deleted Successfully", deleteUser });
    console.log(deleteUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { id, username, phone_no } = req.body;
//     const updatedRecord = await prisma.user.update({
//       where: {
//         data: {
//           id: id,
//           username: username,
//           phone_no: phone_no,
//         },
//       },
//     });
//     res
//       .status(200)
//       .json({ message: "user record updated Successfully", updatedRecord });
//     console.log(updatedRecord);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//     console.log(error);
//   }
// };
