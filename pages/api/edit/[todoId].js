import { getSession } from "next-auth/react";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "success", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });

  if (!session)
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist" });

  if (req.method === "GET") {
    console.log(req.params);
    const id = req.params;

    const todos = user.todos;
    const todo = await todos.filter((todo) => todo._id === id);
    console.log(todo);
  }
}
