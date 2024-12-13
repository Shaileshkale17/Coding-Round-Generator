import { Difficulty } from "../model/Difficulty.model.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";

export const createDifficulty = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  if (!(value && label)) {
    return res.status(400).json({
      status: 400,
      message: "Please provide both a label and a value",
    });
  }

  try {
    const isAlreadyExists = await Difficulty.findOne({ value, label });

    if (isAlreadyExists) {
      return res.status(409).json({
        status: 409,
        message: "The provided value/label already exists",
      });
    }

    const savedData = await Difficulty.create({ label, value });

    if (!savedData) {
      return res.status(500).json({
        status: 500,
        message: "Failed to save data to the database",
      });
    }

    return res
      .status(201)
      .json(new ApiResponse(201, savedData, "success", true));
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Unexpected server error occurred.",
      error: error.message,
    });
  }
});

export const getData = asyncHandler(async (req, res) => {
  try {
    const data = await Difficulty.find({});

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Data fetched successfully", true));
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

export const updated = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { value, label } = req.body;

  if (!(value && label)) {
    return res.status(400).json({
      status: 400,
      message: "Please provide both a label and a value.",
    });
  }

  try {
    const updatedData = await Difficulty.findByIdAndUpdate(
      id,
      { value, label },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: 404,
        message: "Resource not found or invalid ID.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Update successful",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
});

export const deleteDifficulty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await Difficulty.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        status: 404,
        message: "Record not found.",
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedRecord, "Deleted successfully", true));
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
});
