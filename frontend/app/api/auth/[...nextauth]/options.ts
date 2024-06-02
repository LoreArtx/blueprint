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
    async signIn() {
      return true
    },
    // async jwt({token, user, account}){
    //   const dbUser = await AddUser(user,account)
    //   token.id = dbUser.ID
    //   return token
    // },
    // async session({token, session}){
    //     //@ts-ignore
    //     session.user.id=token.id
    //   return session
    // }
  },
  pages:{
    signIn: "/signin"
  }
}