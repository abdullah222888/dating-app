import mongoose from "mongoose";
import { IBlacklist } from "../types/blacklist.interface";

const blacklistSchema = new mongoose.Schema<IBlacklist>(
  {
    blocker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blocked_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Blocklist = mongoose.model("Blacklist", blacklistSchema);
