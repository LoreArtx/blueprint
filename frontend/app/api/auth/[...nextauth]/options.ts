import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import AddUser from "./helpers/AddUser"


export const options : NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks:{
    async signIn({user, account}) {
      await AddUser(user,account)
      return true
    },
  },
  pages:{
    signIn: "/signin"
  }
}