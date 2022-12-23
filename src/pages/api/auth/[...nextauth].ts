import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import sha256 from 'crypto-js/sha256';
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Alison",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username } 
                });

                if (user && 
                    user.password && 
                    user.password == sha256(credentials.password).toString()
                  ) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    session: { strategy: 'jwt' }
};

export default NextAuth(authOptions);
