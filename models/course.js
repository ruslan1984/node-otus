import { Schema, model } from "mongoose";

const CoursesSchema = new Schema(
  {
    id: Schema.ObjectId,
    name: String,
    description: String,
    author: Schema.ObjectId,
    video: String,
    editors: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);

const coursesModel = model("courses", CoursesSchema);
export default coursesModel;
