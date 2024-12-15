import mongoose from "mongoose";

const TopicSchema = mongoose.Schema(
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

export const Topic = mongoose.model("Topic", TopicSchema);
