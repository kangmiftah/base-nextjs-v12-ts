import { PrismaClient, Users } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import prisma from "../_modules/prisma";

let prisma = new PrismaClient();
async function main() {
   // let datauser : Array<Users> = [].map((val : Users) => {
   //    let pass = "";
   //    bcrypt.
   //    return {

   //    }
   // })
   const role = await prisma.role.create({
      data: {
         id: 1,
         name: "SUPER ADMIN",
         description: "Role of super admin"
      }
   })
   const users = await prisma.users.createMany({
      data : [
         {
            name: "Admin",
            email: "admin@email.com",
            password: bcrypt.hashSync("123123", bcrypt.genSaltSync()),
            is_public: false,
            role_id: role.id
         },
         {
            name: "Customer",
            email: "customer@email.com",
            password: bcrypt.hashSync("321321", bcrypt.genSaltSync()),
            is_public: true
         }
      ]
   })

   
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
