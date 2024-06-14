import { OAuthProviderType } from "next-auth/providers/oauth-types"
import { signIn } from "next-auth/react"

const signInByGithub = async ({callbackUrl}:{callbackUrl:string|undefined})=>{
    let redirectURL = null

    try{
        redirectURL = await signIn("github" satisfies OAuthProviderType,{callbackUrl})
        if(!redirectURL){
            return {
                status:"error",
                message:"Failed to login, redirect url not found!"
            }
        }
    }catch(err){
        return {
            status:"error",
            message:"Failed to login"
        }
    }
}

const signInByCredentials = ()=>{

}

export {signInByGithub, signInByCredentials}