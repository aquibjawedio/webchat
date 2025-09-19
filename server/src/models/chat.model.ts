import mongoose, { Schema } from "mongoose";

interface IChat {
  lastMessage: string;
  isGroupt: boolean;

  // If Its a group chat
  name: string;
  description: string;
  avatarUrl: string;
  creatorId: Schema.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema<IChat>(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    lastMessage: {
      type: String,
      trim: true,
      default: "",
    },
    isGroupt: {
      type: Boolean,
      default: false,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
