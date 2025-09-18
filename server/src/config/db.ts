import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.DATABASE_URL);
    console.log(`MONGODB CONNECTION SUCCESSFULL : ${connection.connection.host}`);
  } catch (error) {
    console.log(`FAILED TO CONNECT MONGODB : `, error);
    process.exit(1);
  }
};

export { connectDB };
