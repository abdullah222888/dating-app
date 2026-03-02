// import { PrismaClient } from "@prisma/client";
import express, { Response, Request } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const createTerms = async (req: Request, res: Response) => {
  const { terms_details } = req.body;

  try {
    const terms = await prisma.terms.create({
      data: {
        terms_details: terms_details, // Direct array assignment
      },
    });
    res.status(201).json({
      message: "Terms Details Created Successfully",
      terms,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTerms = async (req: Request, res: Response) => {
  try {
    const terms = await prisma.terms.findMany({});
    res.status(200).json({ message: "All Terms ", terms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
