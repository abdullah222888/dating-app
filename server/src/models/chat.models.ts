import mongoose from "mongoose";
import { IChat } from "../types/chat.interface";

const chatSchema = new mongoose.Schema<IChat>(
  {
    match_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
    participant_one: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participant_two: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

export const Chat = mongoose.model("Chat", chatSchema);
