import mongoose from "mongoose";

const QuestionsSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      default: "Easy",
      enum: ["Easy", "Medium", "Hard"],
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
      required: true,
    },
    completion_time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Questions = mongoose.model("Questions", QuestionsSchema);
