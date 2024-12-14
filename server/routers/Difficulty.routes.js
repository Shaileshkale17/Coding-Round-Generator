import express from "express";
import {
  createDifficulty,
  deleteDifficulty,
  getData,
  updated,
} from "../controllers/Difficulty.controller.js";

const routers = express.Router();

routers.post("/difficulty/create", createDifficulty);
routers.get("/difficulty/full-data", getData);
routers.put("/difficulty/update/:id", updated);
routers.delete("/difficulty/delete/:id", deleteDifficulty);

export default routers;
