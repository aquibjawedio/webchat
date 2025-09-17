import dotenv from "dotenv";
dotenv.config();

interface AppEnv {
  PORT: number;
  FRONTEND_URL: string;
}

const env: AppEnv = {
  PORT: Number(process.env.PORT) || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export { env };
