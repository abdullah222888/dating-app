import mongoose from "mongoose";
import { IMatches } from "../types/match.interface";

const matchSchema = new mongoose.Schema<IMatches>(
  {
    user_one: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user_two: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Match = mongoose.model("Match", matchSchema);
