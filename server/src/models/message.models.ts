import mongoose from "mongoose";
import { IMessage } from "../types/ message.interface";

const messageSchema = new mongoose.Schema<IMessage>(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["sending", "delivered", "Read", "failed"],
    },
    type: {
      type: String,
      enum: ["text", "voice", "photo", "emoji", "gifs"],
    },
    content: {
      type: String,
      required: true,
    },
    media_url: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
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

export const Message = mongoose.model("Message", messageSchema);
