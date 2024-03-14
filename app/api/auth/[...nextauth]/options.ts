import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


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
      console.log(user, account)
      return true
    },
  },
  pages:{
    signIn: "/signin"
  }
}