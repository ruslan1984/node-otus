import { Schema, model } from "mongoose";

const CoursesSchema = new Schema(
  {
    id: Schema.ObjectId,
    name: String,
    video: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: "users" },
    editors: [{ type: Schema.Types.ObjectId, ref: "users" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  },
  {
    timestamps: true,
  }
);

const coursesModel = model("courses", CoursesSchema);
export default coursesModel;
