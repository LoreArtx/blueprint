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
    async jwt({token, user}){
      if(user)
      {
        const dbUser = await AddUser(user)
        token.dbID = dbUser.ID
      }
      return token
    },
    async session({token, session}){
        if(token)
          //@ts-ignore
            session.user.dbID = token.dbID
          
      return session
    }
  },
  pages:{
    signIn: "/signin"
  }
}