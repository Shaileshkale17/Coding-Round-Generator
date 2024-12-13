import express from "express";
import {
  createDifficulty,
  deleteDifficulty,
  getData,
  updated,
} from "../controllers/Difficulty.controller.js";

const routers = express.Router();

routers.post("/create", createDifficulty);
routers.get("/full-data", getData);
routers.put("/update/:id", updated);
routers.delete("/delete/:id", deleteDifficulty);

export default routers;
