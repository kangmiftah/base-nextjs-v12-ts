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
   const menus = await prisma.menu.createMany({
      data : [
         {
            id: 1,
            name : "Dashboard",
            icon_type : "COMPONENT",
            icon :"FiBarChart2",
            url : "/dashboard",
            hash_child: false
         },
         {
            id: 2,
            name : "Management User",
            icon_type : "COMPONENT",
            icon :"FiUsers",
            url : "/management-users",
            hash_child: true
         },
         {
            id: 3,
            name : "Users",
            url : "/management-users/users",
            hash_child: false,
            parent_id : 2,
         },
         {
            id: 4,
            name : "Roles",
            url : "/management-users/roles",
            hash_child: false,
            parent_id : 2,
         },
         {
            id: 5,
            name : "Menu",
            url : "/management-users/menu",
            hash_child: false,
            parent_id : 2,
         }
      ]
   })
   
   const roleMenu = await prisma.roleMenu.createMany({
      data: [
         {
            menu_id :1,
            role_id: role.id
         },
         {
            menu_id :2,
            role_id: role.id
         },
         {
            menu_id :3,
            role_id: role.id
         },
         {
            menu_id :4,
            role_id: role.id
         },
         {
            menu_id :5,
            role_id: role.id
         }
      ]
   })

   console.log({users, role, menus})

   

   
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
