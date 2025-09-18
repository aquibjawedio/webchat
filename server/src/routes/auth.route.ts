import { Router } from "express";
import {
  googleAuthController,
  loginWithGoogleController,
  loginWithPhoneController,
  refreshAccessTokenController,
  registerWithPhoneController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(registerWithPhoneController);
authRouter.route("/login").post(loginWithPhoneController);
authRouter.route("/refresh").get(refreshAccessTokenController);

// Google Login
authRouter.route("/google").get(googleAuthController);
authRouter.route("/google/callback").get(loginWithGoogleController);

export { authRouter };
