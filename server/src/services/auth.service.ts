import { Response } from "express";
import { logger } from "../config/logger.js";
import { Session } from "../models/session.model.js";
import { googleOAuthUser } from "../schemas/auth.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { createCryptoHash } from "../utils/helper.js";
import { User } from "../models/user.model.js";
import { clearCookieOptions, cookieOptions } from "../config/cookie.js";

export const registerWithPhoneService = async (phone: string, code: string) => {};

export const loginWithPhoneService = async (phone: string, code: string) => {};

export const refreshAccessTokenService = async (token: string, res: Response) => {
  logger.info(
    `Attempt To Refresh Access Token : Fetching user session for given refresh token - ${token}`
  );

  const hashedToken = createCryptoHash(token);

  const session = await Session.findOne({ refreshToken: hashedToken, valid: true });

  if (!session) {
    res.clearCookie("accessToken", clearCookieOptions());
    res.clearCookie("refreshToken", clearCookieOptions());
    logger.error(`Refresh Access Token Error : Invalid session or session has been revoked`);
    throw new ApiError(401, "Invalid session or session has been revoked");
  }

  const user = await User.findById(session.userId);

  if (!user) {
    session.isValid = false;
    await session.save();
    res.clearCookie("accessToken", clearCookieOptions());
    res.clearCookie("refreshToken", clearCookieOptions());
    logger.error(`Refresh Access Token Error : User not found for this session`);
    throw new ApiError(404, "User not found for this session");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  session.refreshToken = createCryptoHash(refreshToken);
  await session.save();

  const refreshTokenOptions = cookieOptions(7 * 24);
  const accessTokenOptions = cookieOptions(15);

  return { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions };
};

export const loginWithGoogleService = async (
  profile: googleOAuthUser,
  ip: string,
  userAgent: string
) => {
  logger.info(`Login With Google Service : Checking if user already exists - ${profile.email}`);

  let user = await User.findOne({ email: profile.email });
  if (!user) {
    logger.info(`Login With Google Service : User not found, creating new user - ${profile.email}`);
    user = await User.create({
      fullname: profile.fullName,
      email: profile.email,
      avatarUrl: profile.avatar,
      role: profile.role,
      username: profile.email.split("@")[0],
    });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const session = await Session.create({
    userId: user._id,
    valid: true,
    userAgent,
    ipAddress: ip,
    refreshToken: createCryptoHash(refreshToken),
  });

  logger.info(`Login With Google Service : Session created for user - ${profile.email}`);

  const refreshTokenOptions = cookieOptions(7 * 24);
  const accessTokenOptions = cookieOptions(15);

  return { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions };
};
