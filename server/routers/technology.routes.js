import express from "express";
import {
  create,
  deleted,
  getData,
  updatedData,
} from "../controllers/Technology.controller.js";

const routers = express.Router();

routers.post("/technology/create", create);
routers.get("/technology/full-data", getData);
routers.put("/technology/update/:id", updatedData);
routers.delete("/technology/delete/:id", deleted);

export default routers;
