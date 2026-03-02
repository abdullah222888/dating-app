import express, { Response, Request } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const createPolicies = async (req: Request, res: Response) => {
  const { policies } = req.body;
  try {
    const policy = await prisma.privacyPolicy.create({
      data: {
        policies,
      },
    });
    res
      .status(201)
      .json({ message: "New Polciies Added Successfully", policy });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getPolicies = async (req: Request, res: Response) => {
  try {
    const policy = await prisma.privacyPolicy.findMany();
    res.status(200).json({ message: "ALl Policies", policy });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
