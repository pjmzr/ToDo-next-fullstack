import { getSession } from "next-auth/react";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });
  if (!session)
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });

  if (req.method === "PATCH") {
    const { id, status, desc, title } = req.body;

    if (!id)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });

    const result = await User.updateOne(
      { "todos._id": id },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.desc": desc,
          "todos.$.status": status,
        },
      }
    );
    res.status(200).json({ status: "success" });
  } else if (req.method === "POST") {
    const { id } = req.body;
    console.log(id);

    if (!id)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });

    const card = await User.findOne({ "todos._id": id });
    console.log(card);
  } 
}
