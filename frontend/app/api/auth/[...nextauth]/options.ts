//@ts-nocheck

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
    async jwt({token, user, trigger, session}){
      if(user)
      {
        const dbUser = await AddUser(user)
        token.dbID = dbUser.id
        token.name = dbUser.name
        token.picture = dbUser.image
      }

      if (trigger === "update" && session) {
        token = {...token, user : session}
      }
      return token
    },
    async session({token, session}){
        if(token)
          {
            session.user.dbID = token.dbID
            session.user.name = token.name
            session.user.image = token.picture
          }
          
      return session
    }
  },
  pages:{
    signIn: "/signin"
  }
}