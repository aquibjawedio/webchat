import passport from "passport";
import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { loginWithGoogleService } from "../services/auth.service.js";
import { googleOAuthUser } from "../schemas/auth.schema.js";
import { env } from "../config/env.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerWithPhoneController = asyncHandler(async (req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, "User registered successfully", {}));
});

export const loginWithPhoneController = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, "User logged in successfully", {}));
});

export const refreshAccessTokenController = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, "Access token refreshed successfully", {}));
});

/* CONTINUE WITH GOOGLE */

export const googleAuthController = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

export const loginWithGoogleController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "google",
      { session: false, failureRedirect: "/auth/login" },
      async (err, profile: googleOAuthUser, info) => {
        if (err) return next(err);
        if (!profile) return res.redirect("/auth/login");

        const { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions } =
          await loginWithGoogleService(profile);

        res.cookie("accessToken", accessToken, accessTokenOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);

        res.redirect(`${env.FRONTEND_URL}/profile`);
      }
    )(req, res, next);
  }
);
