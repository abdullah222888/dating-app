import mongoose from "mongoose";
import { IUser } from "../types/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    is_verified: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["premium", "basic"],
    },
    likesCount: {
      type: [Number],
    },
    dislikesCount: {
      type: [Number],
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
