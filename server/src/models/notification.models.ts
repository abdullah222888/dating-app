import mongoose from "mongoose";
import { INotification } from "../types/notification.interface";

const notificationSchmea = new mongoose.Schema<INotification>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    user_relating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["new_match", "new_message", "like_found"],
    },
    isRead: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchmea);
