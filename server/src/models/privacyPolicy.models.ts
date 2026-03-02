import mongoose from "mongoose";
import { IPrivacyPolicy } from "../types/privacyPolicy.interface";

const policiesSchema = new mongoose.Schema<IPrivacyPolicy>(
  {
    policies: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PrivacyPolicy = mongoose.model("PrivacyPolicy", policiesSchema);
