import { googleOAuthUser } from "../schemas/auth.schema.js";

export const registerWithPhoneService = async (phone: string, code: string) => {};

export const loginWithPhoneService = async (phone: string, code: string) => {};

export const refreshAccessTokenService = async (refreshToken: string) => {};

export const loginWithGoogleService = async (profile: googleOAuthUser) => {

  
  return { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions };
};
