import { Users } from "@prisma/client";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../../../backend/_modules/prisma";
import bcrypt from 'bcrypt'

export const optionsAuth: NextAuthOptions = {
   // Configure one or more authentication providers
   session: {
      strategy: "jwt",
      maxAge: 10 * 60,
      updateAge:5 * 60
   },
   providers: [
      Credentials({
         type: "credentials",
         credentials: {},
         async authorize(credentials, req) {
            console.log(req);
            let body : {
               username :string,
               password : string
            } | any = req.body;
            let user = await prisma.users.findFirst({
               where: {
                  email : body?.username
               }
            })
            console.log({body})
            console.log({user})
            if(!user) throw new Error("Email is didnt match")
            let passIsmatch = await bcrypt.compare(body.password, user.password)
            if(!passIsmatch) throw new Error("Password is didnt match")
            return { ...user, id:String(user.id)} ;
         },
      }),
      // ...add more providers here
   ],
   pages:{
      signIn:"/"
   }
};
export default NextAuth(optionsAuth);
