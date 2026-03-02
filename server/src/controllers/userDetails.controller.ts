// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createUserDetails = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      dob,
      profile_photo,
      background_img,
      bio,
      occupation,
      education,
      location,
      marital_status,
      children,
      preferred_family_system,
      requirements,
      deal_breakers,
      timeframe_for_marriage,
      family_details,
      hobbies,
      interests,
      distance,
      media,
      isFeatured,
    } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const userDetails = await prisma.userDetails.create({
      data: {
        user_id,
        dob,
        profile_photo,
        background_img,
        bio,
        occupation,
        education,
        location,
        marital_status,
        children,
        preferred_family_system,
        requirements,
        deal_breakers,
        timeframe_for_marriage,
        family_details,
        hobbies,
        interests,
        distance,
        media,
        isFeatured,
      },
    });
    res
      .status(201)
      .json({ message: "UserDetails Addedd Successfully", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserDetailsbyID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingRecord = await prisma.userDetails.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return res.status(404).json({ message: "user record not found" });
    }
    const userDetail = await prisma.userDetails.findFirst({
      where: { id },
    });
    res.status(200).json({ message: "User Details", userDetail });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
    console.log(error);
  }
};

export const getAllUserDetail = async (req: Request, res: Response) => {
  try {
    const allDetails = await prisma.userDetails.findMany({});
    res.status(200).json({ message: "User Details", allDetails });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
    console.log(error);
  }
};

export const deleteUserDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedData = await prisma.userDetails.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "User Details deleted Successfully", deletedData });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
    console.log(error);
  }
};

export const updateDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const existingRecord = await prisma.userDetails.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return res.status(404).json({ message: "user details not found" });
    }
    const updatedRecord = await prisma.userDetails.update({
      where: { id },
      data,
    });
    res
      .status(201)
      .json({ message: "User Details Updated seccessfully", updatedRecord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};
