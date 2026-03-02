import { IUserDetails } from "../types/userDetails.interface";
import mongoose from "mongoose";

const userDetails = new mongoose.Schema<IUserDetails>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dob: {
      type: String,
      required: true,
    },
    profile_photo: {
      type: String,
      required: true,
    },
    background_img: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    location: {
      type: [String],
      required: true,
      enum: ["lat", "lon"],
    },
    marital_status: {
      type: String,
      enum: ["married", "unmarried", "prefer not say", "seperated"],
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    preferred_family_system: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    deal_breakers: {
      type: String,
      required: true,
    },
    timeframe_for_marriage: {
      type: String,
      required: true,
    },
    family_details: {
      type: [String],
      required: true,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
    },
    isFeatured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const UserDetails = mongoose.model("UserDetails", userDetails);
