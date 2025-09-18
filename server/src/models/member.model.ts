import mongoose, { Schema } from "mongoose";
import { GroupChatRoles, GroupChatRolesEnum } from "../constants/user.constant.js";

interface IMember {
  chat: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const memberSchema = new Schema<IMember>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      trim: true,
      default: GroupChatRoles.GROUP_MEMBER,
      enum: GroupChatRolesEnum,
    },
  },
  { timestamps: true, versionKey: false }
);

const Member = mongoose.model("Member", memberSchema);

export { Member };
