import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ConnectionDB from "./Data/index.js";
import QuestionsRouter from "../server/routers/Questions.routes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", QuestionsRouter);
ConnectionDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Worker ${process.pid} listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
  });
