import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/utils/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import attachImage from "@/features/images/attach-image";
import comparePassword from "@/features/password/comparePassword";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // JWT for credentials
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            email: credentials?.email,
          },
        });
        const isValid = await comparePassword(
          credentials?.password ?? "",
          user.password
        );
        const userWithImage = await attachImage(user, "user");

        if (user && isValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            image: userWithImage.profile_pic?.url,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
