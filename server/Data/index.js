import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectionDB = async () => {
  try {
    const ConnectionURL = await mongoose.connect(
      `${process.env.DBConnectionURL}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default ConnectionDB;
