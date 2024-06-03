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
    // async signIn({user}) {
    //   // console.log(user,account)
    //   // const dbUser = await AddUser(user)
    //   // user.id = dbUser.id;
    //   // return !!dbUser
    // },
    async jwt({token, user}){
      if(user)
      {
        const dbUser = await AddUser(user)
        token.dbID = dbUser.ID
      }
      return token
    },
    async session({token, session, user}){
        if(token)
            session.user.dbID = token.dbID
          
      return session
    }
  },
  pages:{
    signIn: "/signin"
  }
}