import { Users } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../_modules/prisma";

async function main() {
   // let datauser : Array<Users> = [].map((val : Users) => {
   //    let pass = "";
   //    bcrypt.
   //    return {

   //    }
   // })
   const users = await prisma.users.createMany({
      data : [
         {
            name: "Admin 1",
            email: "admin1@email.com",
            password: bcrypt.hashSync("123123", bcrypt.genSaltSync())
         },
         {
            name: "Admin 2",
            email: "admin2@email.com",
            password: bcrypt.hashSync("321321", bcrypt.genSaltSync())
         }
      ]
   })
   console.log({users})
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
