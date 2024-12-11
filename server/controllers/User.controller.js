import JWT from "jsonwebtoken";
import passport from "passport";
import { asyncHandler } from "../util/asyncHandler.util.js";
import User from "../model/User.model.js";
import { ApiResponse } from "../util/ApiResponse.util.js";

// Function to generate JWT Token
export const generateToken = (user) => {
  return JWT.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRESIN_TIME,
  });
};

// Handle successful authentication
export const googleAuthCallback = asyncHandler(async (req, res) => {
  if (req.user) {
    const token = await generateToken(req.user);
    res.status(200).json({
      message: "Google Authentication successful",
      token,
      data: req.user,
    });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!(email && password && name)) {
    return res.status(404).json({
      status: 400,
      message: `email,password or name is required`,
      success: false,
    });
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res.status(404).json({
      status: 401,
      message: `User already exists`,
      success: false,
    });
  }

  const data = await User.create({
    email,
    name,
    password,
  });

  res
    .status(200)
    .json(new ApiResponse(200, data, "created successfully", true));
});

export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(404).json({
      status: 400,
      message: `email or password is required `,
      success: false,
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "User not found",
      success: false,
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      status: 401,
      message: "Invalid user credentials",
      success: false,
    });
  }

  const token = generateToken(user._id);

  const Data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };

  res.status(200).json(new ApiResponse(200, Data, "login success", true));
});
