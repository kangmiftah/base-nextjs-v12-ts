import { Users } from "@prisma/client";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../../../../backend/_modules/prisma";
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
                  email: String(session.user?.email)
               },
               select: {
                  role: true,
                  is_public: true,
                  email: true,
                  id: true,
                  name: true,
                  role_id: true,
               },
            })
            let menuList = await prisma.menu.findMany({
               where: {
                  AND : {
                     parent_id : null
                  }
               },
               include : {
                  childs: true
               }
            })
            return { ...session, userDetail : { ... newUser}, menuList}
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
                        is_public: false
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
   pages: {
      signOut:"/"
   }
};
export default NextAuth(optionsAuth);
