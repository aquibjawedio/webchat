import mongoose, { Schema } from "mongoose";
import { UserRoles, UserRolesEnum } from "../constants/user.constant.js";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

interface IUser {
  fullname: string;
  username: string;
  phone?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
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
    phone: {
      type: String,
      trim: true,
      unique: true,
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role, username: this.username, email: this.email },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      username: this.username,
      email: this.email,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
    }
  );
};

const User = mongoose.model("User", userSchema);

export { User };
