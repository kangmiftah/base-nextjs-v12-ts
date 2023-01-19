import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import prisma from "../_modules/prisma";

let prisma = new PrismaClient();
async function main() {
   await prisma.roleMenu.deleteMany();
   await prisma.actionMenu.deleteMany();
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
            order_no: 4,
            
         },
         {
            id: 3,
            name : "Users",
            url : "/management-users/users",
            hash_child: false,
            parent_id : 2,
            order_no: 1
         },
         {
            id: 4,
            name : "Roles",
            url : "/management-users/roles",
            hash_child: false,
            parent_id : 2,
            order_no: 2
         },
         // Menu Content management
         {
            id: 5,
            name: "Content Management",
            url: "/content-management",
            hash_child: true,
            icon_type : "COMPONENT",
            icon :"FiFilm",
            order_no: 2
         },
            {
               id: 6,
               name: "Banner",
               url: "/content-management/banner",
               hash_child: false,
               parent_id: 5, 
               order_no: 1,
            },
            {
               id: 7,
               name: "Article",
               url: "/content-management/article",
               hash_child: false,
               parent_id: 5, 
               order_no: 2,
            },
          // Product Management
          {
            id: 8,
            name: "Product Management",
            url: "/product-management",
            hash_child: true,
            icon_type : "COMPONENT",
            icon :"FiShoppingBag",
            order_no: 3
         }, 
            {
               id: 9,
               name: "Category",
               url: "/product-management/category",
               hash_child: false,
               parent_id: 8, 
               order_no: 1,
            },
            {
               id: 10,
               name: "Product",
               url: "/product-management/product",
               hash_child: false,
               parent_id: 8, 
               order_no: 2,
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
         
         {
            menu_id :6,
            role_id: 1
         },
         
         {
            menu_id :7,
            role_id: 1
         },
         
         {
            menu_id :8,
            role_id: 1
         },
         
         {
            menu_id :9,
            role_id: 1
         },
         
         {
            menu_id :10,
            role_id: 1
         },

         // add role access menu here
      ]
   })

   const actionMenu = await prisma.actionMenu.createMany({
      data: [
         {
            id:1,
            function_name : "view",
            menu_id: 3,
            name: "View Detail",
            type : "DROPDOWN_IN_LIST"
         },
         {
            id:2,
            function_name : "edit",
            menu_id: 3,
            name: "Edit Users",
            type : "DROPDOWN_IN_LIST"
         },
         {
            id:3,
            function_name : "add",
            menu_id: 3,
            name: "+ Add Users",
            type : "BUTTON_TOOLS"
         },
         {
            id:4,
            function_name : "delete",
            menu_id: 3,
            name: "Delete Users",
            type : "DROPDOWN_IN_LIST",
            on_render: "onRenderDelete",
            class_name:"text-danger"
         },

         {
            id:5,
            function_name : "detailRole",
            menu_id: 4,
            name: "Detail",
            type : "DROPDOWN_IN_LIST"
         },
         {
            id:6,
            function_name : "updateRole",
            menu_id: 4,
            name: "Update Role",
            type : "DROPDOWN_IN_LIST"
         },
         {
            id:7,
            function_name : "accessMenu",
            menu_id: 4,
            name: "Access Menu Role",
            type : "DROPDOWN_IN_LIST"
         },
         {
            id:8,
            function_name : "deleteRole",
            menu_id: 4,
            name: "Delete Role",
            type : "DROPDOWN_IN_LIST",
            on_render: "onRenderDelete",
            class_name:"text-danger"
         },
         {
            id:9,
            function_name : "addRole",
            menu_id: 4,
            name: "+ Add Role",
            type : "BUTTON_TOOLS"
         },
         {
            id:10,
            function_name: "addCategory",
            menu_id:9,
            name:"+ Add Category",
            type: "BUTTON_TOOLS"
         },
         {
            id:11,
            function_name: "updateCategory",
            menu_id:9,
            name:"Update Category",
            type: "DROPDOWN_IN_LIST"
         },
         {
            id:12,
            function_name: "deleteCategory",
            menu_id:9,
            name:"Delete Category",
            type: "DROPDOWN_IN_LIST",
            class_name:"text-danger"
         },
         {
            id:13,
            function_name: "addProduct",
            menu_id:10,
            name:"+ Add Product",
            type: "BUTTON_TOOLS"
         },
         
         {
            id:14,
            function_name: "viewProduct",
            menu_id:10,
            name:"View Product",
            type: "DROPDOWN_IN_LIST"
         },
         {
            id:15,
            function_name: "updateProduct",
            menu_id:10,
            name:"Update Product",
            type: "DROPDOWN_IN_LIST"
         },
         {
            id:16,
            function_name: "deleteCategory",
            menu_id:10,
            name:"Delete Product",
            type: "DROPDOWN_IN_LIST",
            class_name:"text-danger"
         },
         
      ]
   })

   await prisma.roleActionMenu.createMany({
      data: [
         {
            role_id: 1,
            action_menu_id:1,
         },
         {
            role_id: 1,
            action_menu_id:2,
         },
         {
            role_id: 1,
            action_menu_id:3,
         },
         {
            role_id: 1,
            action_menu_id:4,
         },
         {
            role_id: 1,
            action_menu_id:5,
         },
         {
            role_id: 1,
            action_menu_id:6,
         },
         {
            role_id: 1,
            action_menu_id:7,
         },
         {
            role_id: 1,
            action_menu_id:8,
         },
         {
            role_id: 1,
            action_menu_id:9,
         },
         {
            role_id: 1,
            action_menu_id:10,
         },
         {
            role_id: 1,
            action_menu_id:11,
         },
         {
            role_id: 1,
            action_menu_id:12,
         },
         {
            role_id: 1,
            action_menu_id:13,
         },
         {
            role_id: 1,
            action_menu_id:14,
         },
         {
            role_id: 1,
            action_menu_id:15,
         },
         {
            role_id: 1,
            action_menu_id:16,
         }

         
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
