import dotenv from "dotenv";
dotenv.config();

interface AppEnv {
  PORT: number;
}

const env: AppEnv = {
  PORT: Number(process.env.PORT) || 4000,
};

export { env };
