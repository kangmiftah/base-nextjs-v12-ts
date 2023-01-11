// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
      let {detil=undefined} = req.query;
      if (req.method === "POST") return await addRole(req, res, session);
      if (req.method === "PUT") return await updateRole(req, res, session);
      if (req.method === "GET" && !detil) return await getAllRoles(req, res, session);
      if (req.method === "GET" && detil) return await getDetilRole(req, res, session);
      if (req.method === "DELETE") return await deleteRole(req, res, session);
      else
         return res.status(405).json({
            code: "05",
            message: "Method Not Allowed",
         });
   });

async function getAllRoles(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let query = req.query;
   let show: number = parseInt((query.show as string) || "0");
   let skip: number = (parseInt((query.page as string) || "01") - 1) * show;

   console.log({ query });
   let Roles = await prisma.role.findMany({
      take: show,
      skip,
      where: {
         OR: [
            {
               name: {
                  endsWith: query.search as string,
                  startsWith: query.search as string,
                  mode: "insensitive",
               },
            },
         ],
      },
   });
   return res.json({
      code: "00",
      message: "Success",
      data: Roles,
   });
}
async function addRole(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Role> = {
      code: "00",
      message: "Role berhasil di tambahkan",
   };

   try {
      
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.role.create({
         data: {
            name: body.name,
            description: body.description,
         },
      });

      if (!data) throw new Error("Failed to create Roles");
      return res.status(201).json({
         code: "00",
         message: "Role successfully u",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function updateRole(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Role> = {
      code: "00",
      message: "Role berhasil di tambahkan",
   };

   try {
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.role.update({
         where: {
            id: body.id,
         },
         data: {
            name: body.name,
            description: body.description,
            updated_at: moment(Date.now()).format(),
         },
      });

      if (!data) throw new Error("Failed to update Roles");
      return res.status(201).json({
         code: "00",
         message: "Role successfully updated",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function deleteRole(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   if (!body.id)
      return res.status(400).json({
         code: "01",
         message: "Id is field required",
      });
   try {
      let deleted = await prisma.role.delete({
         where: {
            id: parseInt(body.id),
         },
      });
      if (!deleted) throw new Error("Failed to delete Roles");
      return res.status(201).json({
         code: "00",
         message: "Role successfully deleted",
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
async function getDetilRole(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let {detil = "0"} = req.query;
   console.log({ query : req.query });
   try {
      let Role = await prisma.role.findFirst({
         include:{
            menuList: {
               where:{
                 menuList:{
                  parent_id:null
                 } 
               },
               include: {
                  menuList: {
                     include:{
                        childs: true
                     }
                  }
               },
               orderBy: {
                  menu_id:"asc"
               }
            }
         },
         where: {
            AND: {
               id: parseInt(detil as string),
            },
         },
      });
      if (!Role) return res.status(404).json({
         code: "04",
         message: "Role didn't match",
         data: {}
      })
      return res.json({
         code: "00",
         message: "Success",
         data: Role,
      });
      
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
