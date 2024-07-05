import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: String,

  lastName: String,

  email: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  todos: [{ title: String, status: String, desc: String }],
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.UserC || model("UserC", userSchema);

export default User;
