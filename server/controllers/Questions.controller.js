import { Difficulty } from "../model/Difficulty.model.js";
import { Questions } from "../model/Questions.model.js";
import { Technology } from "../model/Technology.model.js";
import { Topic } from "../model/Topic.model.js";
import { ApiError } from "../util/ApiError.util.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";
import mongoose from "mongoose";

const validateFields = (fields) => fields.every((field) => !!field);

function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
  // Validate required fields
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

  const already = await Questions.find({
    $and: [{ label: label }, { value: value }, { technology: technology }],
  });

  if (already.length > 0) {
    return res.status(404).json({
      status: 404,
      message: "Already exists in the database",
      success: false,
    });
  }

  try {
    // Check and save difficulty if not already exists
    let difficultyData = await Difficulty.findOne({
      value: capitalizeFirstLetter(difficulty),
      label: capitalizeFirstLetter(difficulty),
    });

    if (!difficultyData) {
      difficultyData = await Difficulty.create({
        value: difficulty,
        label: capitalizeFirstLetter(difficulty),
      });
    }

    let technologyData = await Technology.findOne({
      value: capitalizeFirstLetter(technology),
      label: capitalizeFirstLetter(technology),
    });

    if (!technologyData) {
      await Technology.create({
        value: technology,
        label: capitalizeFirstLetter(technology),
      });
    }

    // Check and save tags if not already exists
    const existingTags = await Promise.all(
      tags.map(async (tag) => {
        return Topic.findOne({ value: tag, label: capitalizeFirstLetter(tag) });
      })
    );

    const newTags = tags.filter((_, index) => !existingTags[index]);

    if (newTags.length > 0) {
      await Promise.all(
        newTags.map(async (tag) => {
          return Topic.create({
            label: capitalizeFirstLetter(tag),
            value: tag,
          });
        })
      );
    }

    // Save the question
    const saveData = await Questions.create({
      label,
      value,
      technology,
      difficulty,
      description,
      tags,
      completion_time,
    });

    // Validate that the question was saved
    const checkSaveData = await Questions.findById(saveData._id);
    if (!checkSaveData) {
      return res.status(500).json({
        status: 500,
        message: "Data not saved, please try again",
        success: false,
      });
    }

    // Success response
    res
      .status(200)
      .json(new ApiResponse(200, checkSaveData, "Created successfully", true));
  } catch (error) {
    // Catch and return any errors
    return res.status(500).json({
      status: 500,
      message: "An error occurred while creating the question",
      success: false,
      error: error.message,
    });
  }
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
