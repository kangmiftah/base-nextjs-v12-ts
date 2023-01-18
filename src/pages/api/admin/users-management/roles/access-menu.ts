import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseResponseAPI } from "../../../../../@types/backend/response";
import { authApiAdmin } from "../../../../../backend/_modules/middleware";
import prisma from "../../../../../backend/_modules/prisma";
import exclude from "../../../../../backend/_modules/prisma/excludeFields";
import * as bcrypt from "bcrypt";
import moment from "moment";

type Data = {
   name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<BaseResponseAPI>) =>
   authApiAdmin(res, req, async function (session: any) {
      let { detil = undefined } = req.query;
      // if (req.method === "POST") return await addRole(req, res, session);
      if (req.method === "PUT") return await setAccessMenu(req, res, session);
      // if (req.method === "GET" && !detil) return await getAllRoles(req, res, session);
      if (req.method === "GET") return await getAccessMenu(req, res, session);
      // if (req.method === "DELETE") return await deleteRole(req, res, session);
      else
         return res.status(405).json({
            code: "05",
            message: "Method Not Allowed",
         });
   });

async function getAccessMenu(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let { role_id = "0", search = "" } = req.query;
   console.log({ query: req.query });
   let where_clause: string = "";
   if (search !== "")
      where_clause = ` and (LOWER(m.name) like LOWER('%${search}%') )`;
   try {
      let query = `
         with main as (
            select m.*, (
            case
               when rm.role_id is null then false else true
            end
            ) as access_role from menu m left join role_menu rm ON rm.menu_id = m.id and rm.role_id = ${role_id} where parent_id is null ${where_clause}
            order by m.order_no asc
         ), child as (
            select m.*, (
            case
               when rm.role_id is null then false else true
            end
            ) as access_role from menu m left join role_menu rm ON rm.menu_id = m.id and rm.role_id = ${role_id} where parent_id is not null order by order_no asc
         ), action_child as (
            select mchild.id as child_id, jsonb_agg(amx.*) as actions from menu mchild join (
               select am.*, (
               case
                  when ram.role_id is null then false else true
               end
               ) as access_role from action_menu am left join role_action_menu ram on ram.action_menu_id = am.id and ram.role_id = ${role_id}
            ) as amx on amx.menu_id = mchild.id  group by mchild .id
         ), submenu as (
            select main.id, jsonb_agg(ch.*) filter (where ch.id is not null) as childs  from main left join
            (select child.*, coalesce (ac.actions, '[]') as actions from child left join action_child ac  on ac.child_id = child.id order by child.order_no asc)
            as ch on ch.parent_id  = main.id group by main.id
         ), mainmenu as (
            select main.*,
            coalesce (submenu.childs, '[]' ) as childs,
            coalesce (ac.actions, '[]') as actions from main 
            left join action_child ac  on ac.child_id = main.id 
            left join submenu on submenu.id = main.id
            order by main.order_no asc
         ) select * from mainmenu;
         `;

      console.log(query);
      let access_menu = await prisma.$queryRawUnsafe<Array<any>>(query);
      if (!access_menu) access_menu = [];
      return res.json({
         code: "00",
         message: "Success",
         data: access_menu,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function setAccessMenu(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body: any = req.body;
   console.log({ body });
   const {
      role_id = 0,
      menu_id = 0,
      accessed = false,
      type,
      action_id = 0,
   } = body;
   try {
      let accessing: any;
      if (type === "MENU") {
         if (accessed)
            accessing = await prisma.roleMenu.create({
               data: {
                  assign_by: session?.userDetail?.id,
                  menu_id: menu_id,
                  role_id: role_id,
               },
            });
         else{
            accessing = await prisma.roleMenu.delete({
               where: {
                  menu_id_role_id: { menu_id: menu_id, role_id: role_id },
               },
               
            });
            await prisma.roleMenu.deleteMany({
               where: {
                  OR : {
                     AND : {
                        menuList: {
                           parent_id : menu_id
                        },
                        role_id: role_id
                     }
                  }
               }
            });
            await prisma.roleActionMenu.deleteMany({
               where: {
                 role_id: role_id,
                 actionMenu: {
                  menu:{
                     AND: {
                        parent_id : menu_id
                     }
                  }
                 }
               }
            })
            await prisma.roleActionMenu.deleteMany({
               where: {
                  role_id: role_id,
                  actionMenu: {
                     AND : {
                        menu_id: menu_id
                     }
                  }
               }
            })
         }
      }
      if (type === "ACTION") {
         if (accessed)
            accessing = await prisma.roleActionMenu.create({
               data: {
                  assign_by: session?.userDetail?.id,
                  action_menu_id: action_id,
                  role_id: role_id,
               },
            });
         else
            accessing = await prisma.roleActionMenu.delete({
               where: {
                  role_id_action_menu_id: { action_menu_id: action_id, role_id: role_id },
               },
            });
      }
      if (!accessing)
         return res.status(400).json({
            code: "04",
            message: "Failed assign menu",
         });
      return res.json({
         code: "00",
         message: "Success",
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
