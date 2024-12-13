import { Technology } from "../model/Technology.model.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";
import express from "express";

const router = express.Router();

// Create a new technology
export const create = asyncHandler(async (req, res) => {
  try {
    const { value, label } = req.body;

    const existingTechnology = await Technology.findOne({ value });

    if (existingTechnology) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Technology already exists.",
            existingTechnology
          )
        );
    }

    const technology = new Technology({ value, label });
    const savedTechnology = await technology.save();

    res
      .status(201)
      .json(
        new ApiResponse(true, "Technology added successfully", savedTechnology)
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, "Server error", error.message));
  }
});

// Fetch all technologies
export const getData = asyncHandler(async (req, res) => {
  try {
    const technologies = await Technology.find({});
    res
      .status(200)
      .json(new ApiResponse(true, "Fetched all technologies", technologies));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, "Server error", error.message));
  }
});

// Update technology data
export const updatedData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { value, label } = req.body;

    const updatedTechnology = await Technology.findByIdAndUpdate(
      id,
      { value, label },
      { new: true }
    );

    if (!updatedTechnology) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Technology not found"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Technology updated successfully",
          updatedTechnology
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, "Server error", error.message));
  }
});

// Delete technology
export const deleted = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTechnology = await Technology.findByIdAndDelete(id);

    if (!deletedTechnology) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Technology not found"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Technology deleted successfully",
          deletedTechnology
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, "Server error", error.message));
  }
});
