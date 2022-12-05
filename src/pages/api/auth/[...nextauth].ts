import NextAuth, {NextAuthOptions, Session,} from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const optionsAuth : NextAuthOptions  = {
   // Configure one or more authentication providers
   callbacks: {
      async jwt({ token, account}){
         if(account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
      session({ session, token, user }) {
         let d : Session & { accessToken : any} = { ...session, accessToken: token.accessToken} 
         return d;
      },
   },
   providers: [
     
     // ...add more providers here
   ],
 }
export default NextAuth(optionsAuth);