import { Technology } from "../model/Technology.model.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";

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
            existingTechnology,
            "Technology already exists."
          )
        );
    }

    const technology = new Technology({ value, label });
    const savedTechnology = await technology.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          savedTechnology,
          "Technology added successfully",
          true
        )
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", error });
  }
});

// Fetch all technologies
export const getData = asyncHandler(async (req, res) => {
  try {
    const technologies = await Technology.find({});
    res
      .status(200)
      .json(
        new ApiResponse(200, technologies, "Fetched all technologies", true)
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", error });
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
          200,
          updatedTechnology,
          "Technology updated successfully",
          true
        )
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", error });
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
          200,
          deletedTechnology,
          "Technology deleted successfully",
          true
        )
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", error });
  }
});
