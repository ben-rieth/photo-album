import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { env as clientEnv } from '../../../env/client.mjs'
import axios from "axios";

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
        },
        async signIn({ user }) {
            try {
                const result = await axios.post(
                    `${clientEnv.NEXT_PUBLIC_URL}/api/user/allowed`,
                    { email: user.email }
                ).then(res => res.data);
                if(!result.allowed) throw new Error();

                return result.allowed;
            } catch (err) {
                throw new Error("Not authorized to sign in");
            }
            
        },
    }
};

export default NextAuth(authOptions);
