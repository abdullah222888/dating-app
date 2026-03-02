import mongoose from "mongoose";
import { ITerms } from "../types/terms.interface";

const termSchema = new mongoose.Schema<ITerms>(
  {
    terms_details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Terms = mongoose.model("Terms", termSchema);
