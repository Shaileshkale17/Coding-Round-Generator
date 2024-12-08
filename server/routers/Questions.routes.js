import express from "express";
import {
  UpdateQuestions,
  createQuestion,
  getdata,
  QuestionsDeleted,
  randomOne,
} from "../controllers/Questions.controller.js";

const routers = express.Router();

routers.post("/create", createQuestion);
routers.get("/full-data", getdata);
routers.get("/randomOne", randomOne);
routers.put("/update/:id", UpdateQuestions);
routers.delete("/delete/:id", QuestionsDeleted);

export default routers;
