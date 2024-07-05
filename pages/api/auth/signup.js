import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ status: "failed", message: "Invalid data!" });

  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const user = await User.findOne({ email });

  if (user)
    return res
      .status(422)
      .json({ status: "failed", message: "User exists already!" });

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashedPassword });

  console.log(newUser);
  res.status(201).json({ status: "success", message: "User created!" });
}
