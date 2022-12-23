import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: env.EMAIL_HOST,
                port: Number(env.EMAIL_PORT),
                auth: {
                    user: env.EMAIL_USER,
                    pass: env.EMAIL_PASS,
                },
                secure: true,
            },
            from: env.EMAIL_FROM,
            maxAge: 10 * 60,
        })
    ],
    pages: {
        signIn: '/',
        error: '/',
        verifyRequest: '/',
        signOut: '/'
    },
    callbacks: {
        async session({ session }) {
            return session;
        }
    }
};

export default NextAuth(authOptions);
