import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, GitHub],
    adapter: PrismaAdapter(prisma)
})