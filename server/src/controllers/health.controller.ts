import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const healthController = asyncHandler(async (req: Request, res: Response) => {
  const health = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  };

  return res.status(200).json(new ApiResponse(200, "Health Check Passed", { health }));
});
