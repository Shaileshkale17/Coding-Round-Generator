import express from "express";
import {
  create,
  deleted,
  getData,
  updatedData,
} from "../controllers/Technology.controller.js";

const routers = express.Router();

routers.post("/create", create);
routers.get("/full-data", getData);
routers.put("/update/:id", updatedData);
routers.delete("/delete/:id", deleted);

export default routers;
