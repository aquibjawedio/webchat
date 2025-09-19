import { z } from "zod";

export const refreshTokenSchema = z.object({
  token: z.string().min(1, "Refresh token is required"),
});

export const googleOAuthUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  email: z.email(),
  avatar: z.string(),
  role: z.enum(["user", "admin"]).default("user"),
  sessionId: z.string().optional(),
});

export type googleOAuthUser = z.infer<typeof googleOAuthUserSchema>;
