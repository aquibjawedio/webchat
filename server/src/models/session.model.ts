import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);


const Session = mongoose.model("Session", sessionSchema);

export { Session };
