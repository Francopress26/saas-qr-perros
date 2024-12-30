import { getUser, validateUser } from "@/actions/user-actions"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { revalidatePath } from "next/cache"

// Your own logic for dealing with plaintext password strings; be careful!

export const { auth,signIn,signOut,handlers } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const response = await validateUser(credentials)
        if(response.ok) return response.user
        else throw new Error (response.message)
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks:{
    async jwt({token}) {
       const dbUser = await getUser(token.email)
        token.roles = dbUser.user.roles ?? ""
        token.userId = dbUser.user.id ?? ""
        token.telefono = dbUser.user.telefono ?? ""

        return token
      },
 
      session({ session, token }) {
        session.user.roles = token.roles ?? "none"
        session.user.userId = token.userId ?? ""
        session.user.telefono = token.telefono ?? ""
        revalidatePath("/")
        return session
      },
     
   
  },
  pages:{
    signIn: "/auth/sign-in"
  },

})