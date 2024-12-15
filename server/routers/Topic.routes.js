import express from "express";
import {
  createTopic,
  deleteTopic,
  getData,
  updated,
} from "../controllers/Topic.controller.js";

const routers = express.Router();

routers.post("/topic/create", createTopic);
routers.get("/topic/full-data", getData);
routers.put("/topic/update/:id", updated);
routers.delete("/topic/delete/:id", deleteTopic);

export default routers;
