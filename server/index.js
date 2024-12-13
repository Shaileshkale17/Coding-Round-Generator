import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "./controllers/Passport.controller.js";
import session from "express-session";
import ConnectionDB from "./Data/index.js";
import QuestionsRouter from "../server/routers/Questions.routes.js";
import AuthRouter from "./routers/auth.routes.js";
import DifficultyRouters from "./routers/Difficulty.routes.js";
import technologyRouters from "./routers/technology.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.ORIGIN, // Explicitly allow this origin
    credentials: true, // Allow cookies or sessions when making a request
  })
);

// Sessions setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Use `true` only in production with HTTPS
      sameSite: "lax",
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/api", QuestionsRouter);
app.use("/api", DifficultyRouters);
app.use("/api", technologyRouters);
app.use("/api", AuthRouter);

// Database connection and server startup
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
