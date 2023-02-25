import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id: Schema.ObjectId,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

const commentModel = model("comments", CommentSchema);
export default commentModel;