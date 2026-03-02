import mongoose from "mongoose";
import { IReportList } from "../types/reportList.interface";

const reportListschema = new mongoose.Schema<IReportList>(
  {
    reporter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reported_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const ReportList = mongoose.model("ReportList", reportListschema);
