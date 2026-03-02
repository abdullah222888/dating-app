import express, { Response, Request } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const createGuideline = async (req: Request, res: Response) => {
  const { guidelines } = req.body;
  try {
    const guideline = await prisma.guidelines.create({
      data: { guidelines },
    });
    res
      .status(201)
      .json({ message: "New Guidelines Added Successfully", guideline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const allGuidelines = async (req: Request, res: Response) => {
  try {
    const guideline = await prisma.guidelines.findMany();
    res.status(200).json({ message: "All Guidelines", guideline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
