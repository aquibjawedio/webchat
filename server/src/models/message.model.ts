import mongoose, { Schema } from "mongoose";

interface IMessage {
  content: string;
  chat: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  attachmentUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    attachmentUrl: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Message = mongoose.model("Message", messageSchema);

export { Message };
