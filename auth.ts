import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        }
      },

      async authorize(credentials) {
        if (!credentials?.email || typeof credentials.email !== "string") return null;
        if (!credentials?.password || typeof credentials.password !== "string") return null;

        // 1️⃣ Check if user already exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        // 2️⃣ User exists → verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) return null

        // 3️⃣ Return user object for NextAuth
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          image: user.image
        }
      },
    }),
  ],

  // REQUIRED for Auth.js v5 to keep session updates working session
  session: {
    strategy: "jwt",
  },

  // REQUIRED in Next.js App Router to avoid callback URL errors
  trustHost: true,

  // callbacks are async functions, so you can also get extra information
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // We 'persist' the ID from the database into the encrypted JWT
        token.id = user.id as string;
        token.role = user.role as string;
        token.image = user.image as string | null;
      };
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // We take the ID we saved in the JWT and put it in the Session
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string | null;
      };
      return session;
    }
  },
})