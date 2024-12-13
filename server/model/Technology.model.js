import mongoose from "mongoose";

const TechnologySchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Technology = mongoose.model("Technology", TechnologySchema);
