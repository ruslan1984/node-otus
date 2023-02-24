import { Schema, model } from "mongoose";

const UsersSchema = new Schema(
  {
    id: Schema.ObjectId,
    name: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const usersModel = model("users", UsersSchema);
export default usersModel;
