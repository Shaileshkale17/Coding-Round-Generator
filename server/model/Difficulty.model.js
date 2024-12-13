import mongoose from "mongoose";

const DifficultySchema = mongoose.Schema(
  {
    value: {
      type: String,
      default: "Easy",
    },
    label: {
      type: String,
      default: "Easy",
    },
  },
  {
    timestamps: true,
  }
);

export const Difficulty = mongoose.model("Difficulty", DifficultySchema);
