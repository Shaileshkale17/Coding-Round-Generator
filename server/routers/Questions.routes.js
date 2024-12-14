import express from "express";
import {
  UpdateQuestions,
  createQuestion,
  getdata,
  QuestionsDeleted,
  randomOne,
} from "../controllers/Questions.controller.js";

const routers = express.Router();

routers.post("/questions/create", createQuestion);
routers.get("/questions/full-data", getdata);
routers.get("/questions/randomOne", randomOne);
routers.put("/questions/update/:id", UpdateQuestions);
routers.delete("/questions/delete/:id", QuestionsDeleted);

export default routers;
