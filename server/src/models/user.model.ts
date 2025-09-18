import mongoose, { Schema } from "mongoose";
import { UserRoles, UserRolesEnum } from "../constants/user.constant.js";

interface IUser {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: UserRoles.USER,
      enum: UserRolesEnum,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export { User };
