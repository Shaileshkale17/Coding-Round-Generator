import express from "express";
import passport from "passport";
import { googleAuthCallback } from "../controllers/User.controller.js";
const router = express.Router();

// Intitiate Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_LOGIN_URL,
    successRedirect: process.env.FRONTEND_LOGIN_REDIREACT,
  }),
  googleAuthCallback
);

export default router;
