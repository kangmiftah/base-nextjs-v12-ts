import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import prisma from "../_modules/prisma";

let prisma = new PrismaClient();
async function main() {
   await prisma.roleMenu.deleteMany();
   await prisma.menu.deleteMany();
   const menus = await prisma.menu.createMany({
      data : [
         {
            id: 1,
            name : "Dashboard",
            icon_type : "COMPONENT",
            icon :"FiBarChart2",
            url : "/dashboard",
            hash_child: false,
            order_no: 1
         },
         {
            id: 2,
            name : "Management User",
            icon_type : "COMPONENT",
            icon :"FiUsers",
            url : "/management-users",
            hash_child: true,
            order_no: 2
         },
         {
            id: 3,
            name : "Users",
            url : "/management-users/users",
            hash_child: false,
            parent_id : 2,
            order_no: 3
         },
         {
            id: 4,
            name : "Roles",
            url : "/management-users/roles",
            hash_child: false,
            parent_id : 2,
            order_no: 4
         },
         {
            id: 5,
            name : "Menu",
            url : "/management-users/menu",
            hash_child: false,
            parent_id : 2,
            order_no: 5
         },
         
         // add new menu here or custom here
      ]
   })
   
   const roleMenu = await prisma.roleMenu.createMany({
      data: [
         {
            menu_id :1,
            role_id: 1
         },
         {
            menu_id :2,
            role_id: 1
         },
         {
            menu_id :3,
            role_id: 1
         },
         {
            menu_id :4,
            role_id: 1
         },
         {
            menu_id :5,
            role_id: 1
         },
         // add role access menu here
      ]
   })

   console.log({ menus, roleMenu })

   

   
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
