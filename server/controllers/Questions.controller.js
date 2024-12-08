import { Questions } from "../model/Questions.model.js";
import { ApiError } from "../util/ApiError.util.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";
import mongoose from "mongoose";

const validateFields = (fields) => fields.every((field) => !!field);

export const createQuestion = asyncHandler(async (req, res) => {
  const {
    label,
    value,
    technology,
    difficulty,
    description,
    tags,
    completion_time,
  } = req.body;

  if (
    !validateFields([
      label,
      value,
      technology,
      tags,
      difficulty,
      description,
      completion_time,
    ])
  ) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
      success: false,
    });
  }

  const saveData = await Questions.create({
    label,
    value,
    technology,
    difficulty,
    description,
    tags,
    completion_time,
  });

  const checkSaveData = await Questions.findById(saveData._id);
  if (!checkSaveData) {
    return res.status(500).json({
      status: 500,
      message: "Data not saved, please try again",
      success: false,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, checkSaveData, "Created successfully", true));
});

export const getdata = asyncHandler(async (req, res) => {
  const data = await Questions.find({});
  res
    .status(200)
    .json(new ApiResponse(200, data, "Retrieved all questions", true));
});

export const UpdateQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ID format",
      success: false,
    });
  }

  const {
    label,
    value,
    technology,
    difficulty,
    description,
    tags,
    completion_time,
  } = req.body;

  console.log({
    label,
    value,
    technology,
    difficulty,
    description,
    tags,
    completion_time,
  });
  if (
    !validateFields([
      label,
      value,
      technology,
      tags,
      difficulty,
      description,
      completion_time,
    ])
  ) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
      success: false,
    });
  }

  const updatedData = await Questions.findByIdAndUpdate(
    id,
    {
      label,
      value,
      technology,
      difficulty,
      description,
      tags,
      completion_time,
    },
    { new: true }
  );

  if (!updatedData) {
    return res.status(500).json({
      status: 500,
      message: "Data not updated",
      success: false,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedData, "Data updated successfully", true));
});

export const QuestionsDeleted = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ID format",
      success: false,
    });
  }

  const deleted = await Questions.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(500).json({
      status: 500,
      message: "Data not deleted",
      success: false,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, deleted, "Data deleted successfully", true));
});

export const randomOne = asyncHandler(async (req, res) => {
  const { Technology, Difficulty, Topic } = req.body;

  // Validate the request body
  if (!(Technology && Difficulty && Topic)) {
    return res.status(400).json({
      status: 400,
      message: "Technology, Difficulty, and Topic are required",
      success: false,
    });
  }

  // Query the database for matching tasks
  const matchingTasks = await Questions.find({
    technology: Technology,
    difficulty: Difficulty,
    tags: Topic, // Assuming "Topic" corresponds to the "tags" field
  });

  // Check if any tasks match the criteria
  if (matchingTasks.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "No matching tasks found",
      success: false,
    });
  }

  // Select a random task from the matching tasks
  const randomTask =
    matchingTasks[Math.floor(Math.random() * matchingTasks.length)];

  // Respond with the random task
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        randomTask,
        "Random task retrieved successfully",
        true
      )
    );
});
