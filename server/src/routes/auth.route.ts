import { Router } from "express";
import { refreshAccessTokenController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/refresh").get(refreshAccessTokenController);

export { authRouter };
