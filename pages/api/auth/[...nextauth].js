import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        if (!email || !password) throw new Error("Invalid data!");

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB");
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("User doesn't exist!");

        const verifiedPass = await verifyPassword(password, user.password);
        if (!verifiedPass) throw new Error("Username or password is incorrect");

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
