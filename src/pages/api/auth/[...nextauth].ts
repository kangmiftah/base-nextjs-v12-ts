import { Users } from "@prisma/client";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../../../backend/_modules/prisma";
import bcrypt from 'bcrypt'
import { randomUUID } from "crypto";

export const optionsAuth: NextAuthOptions = {
   // Configure one or more authentication providers
   session: {
      strategy: "jwt",
      maxAge: 10 * 60,
      updateAge:5 * 60,
   },
   callbacks: {
      async session(params) {
            let { session, user, token } = params
            let newUser = await prisma.users.findFirst({
               where: {
                  email: String(session?.user?.email)
               },
               select: {
                
                  is_public: true,
                  email: true,
                  id: true,
                  name: true,
               },
            })
            return { ...session, userDetail : { ... newUser}}
      },
   },
   providers: [
      Credentials({
         type: "credentials",
         
         credentials: {},
         
         async authorize(credentials, req) {
            let body : {
               username :string,
               password : string,
               loginType : "ADMIN" | "PUBLIC"
            } | any = req.body;
            let user = await prisma.users.findFirst({
               where: {
                  AND: [
                     {
                        email: body?.username
                     },{
                        is_public:true
                     }
                  ]
               }
            })
            if(!user) throw new Error("Email is didnt match")
            let passIsmatch = await bcrypt.compare(body.password, user.password)
            if(!passIsmatch) throw new Error("Password is didnt match")
            return { ... user, role_id: user.role_id, id:String(user.id)} ;
         },
         
      }),
      
      // ...add more providers here
   ],
   pages:{
      signIn:"/"
   }
};
export default NextAuth(optionsAuth);
