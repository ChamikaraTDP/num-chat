import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./src/actions/api";
import bcrypt from "bcrypt";


export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/assignment-2/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ username: z.string().min(4), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) throw new Error("User not found.");

          const passwordsMatch = await bcrypt.compare(password, user.password);
          const newU = { ...user, name: user.username, email: user.user_id.toString() };

          if (passwordsMatch) return newU;
        }

        return null;
      },
    }),
  ],
});
