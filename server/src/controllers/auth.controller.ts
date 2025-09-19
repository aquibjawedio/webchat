import passport from "passport";
import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { loginWithGoogleService, refreshAccessTokenService } from "../services/auth.service.js";
import { googleOAuthUser, refreshTokenSchema } from "../schemas/auth.schema.js";
import { env } from "../config/env.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerWithPhoneController = asyncHandler(async (req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, "User registered successfully", {}));
});

export const loginWithPhoneController = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, "User logged in successfully", {}));
});

export const refreshAccessTokenController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = refreshTokenSchema.safeParse({ token: req.cookies.refreshToken });

  if (!data) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(400).json(new ApiResponse(400, "Refresh token is required", {}));
  }

  const {} = await refreshAccessTokenService(data.token, res);

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

        const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions } =
          await loginWithGoogleService(profile, ip as string, userAgent);

        res.cookie("accessToken", accessToken, accessTokenOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);

        res.redirect(`${env.FRONTEND_URL}/profile`);
      }
    )(req, res, next);
  }
);
