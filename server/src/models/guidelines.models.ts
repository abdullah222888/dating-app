import mongoose from "mongoose";
import { IGuidelines } from "../types/guidelines.interface";

const guidelineSchema = new mongoose.Schema<IGuidelines>(
  {
    guidelines: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Guidelines = mongoose.model("Guidelines", guidelineSchema);
