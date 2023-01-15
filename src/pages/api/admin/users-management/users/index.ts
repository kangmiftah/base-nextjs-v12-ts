// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { bodyUser } from "../../../../../@types/backend/admin/users-management";
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
      if (req.method === "POST") return await addUser(req, res, session);
      if (req.method === "PUT") return await updateUser(req, res, session);
      if (req.method === "GET" && !detil) return await getAllUsers(req, res, session);
      if (req.method === "GET" && detil) return await getDetilUser(req, res, session);
      if (req.method === "DELETE") return await deleteUser(req, res, session);
      else
         return res.status(405).json({
            code: "05",
            message: "Method Not Allowed",
         });
   });

async function getAllUsers(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let query = req.query;
   let show: number = parseInt((query.show as string) || "0");
   let skip: number = (parseInt((query.page as string) || "01") - 1) * show;

   console.log({ query });
   let users = await prisma.users.findMany({
      select: {
         id: true,
         email: true,
         name: true,
         role_id: true,
         role: {
            select: {
               name: true,
            },
         },
      },
      take: show,
      skip,
      where: {
         OR: [
            {
               email: {
                  endsWith: query.search as string,
                  startsWith: query.search as string,
                  mode: "insensitive",
               },
            },
            {
               name: {
                  endsWith: query.search as string,
                  startsWith: query.search as string,
                  mode: "insensitive",
               },
            },
         ],
         AND: {
            is_public: false,
         },
      },
   });
   return res.json({
      code: "00",
      message: "Success",
      data: users,
   });
}
async function addUser(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Users> = {
      code: "00",
      message: "User berhasil di tambahkan",
   };

   try {
      if (!body.email)
         return res.status(400).json({
            code: "01",
            message: "Email is field required",
         });
      if (!body.password)
         return res.status(400).json({
            code: "01",
            message: "password is field required",
         });

      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      if (!body.role_id)
         return res.status(400).json({
            code: "01",
            message: "Role is field required",
         });

      if (body.password !== body.re_password)
         return res.status(400).json({
            code: "01",
            message: "Password didnt match !",
         });

      let data = await prisma.users.create({
         data: {
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, bcrypt.genSaltSync()),
            role_id: parseInt(body.role_id) || null,
            created_by: session?.userDetail?.id || null,
            is_public: false,
         },
      });

      if (!data) throw new Error("Failed to create users");
      return res.status(201).json({
         code: "00",
         message: "User successfully u",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function updateUser(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Users> = {
      code: "00",
      message: "User berhasil di tambahkan",
   };

   try {
      if (!body.email)
         return res.status(400).json({
            code: "01",
            message: "Email is field required",
         });
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      if (!body.role_id)
         return res.status(400).json({
            code: "01",
            message: "Role is field required",
         });

      let data = await prisma.users.update({
         where: {
            id: body.id,
         },
         data: {
            name: body.name,
            email: body.email,
            role_id: parseInt(body.role_id) || null,
            updated_at: moment(Date.now()).format(),
         },
      });

      if (!data) throw new Error("Failed to update users");
      return res.status(201).json({
         code: "00",
         message: "User successfully updated",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function deleteUser(
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
      let deleted = await prisma.users.delete({
         where: {
            id: parseInt(body.id),
         },
      });
      if (!deleted) throw new Error("Failed to delete users");
      return res.status(201).json({
         code: "00",
         message: "User successfully deleted",
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
async function getDetilUser(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let {detil = "0"} = req.query;
   console.log({ query : req.query });
   try {
      let user = await prisma.users.findFirst({
         include:{
            role:{
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
               }
            }
         },
         where: {
            AND: {
               id: parseInt(detil as string),
               is_public: false,
            },
         },
      });
      // let role = await prisma.roleMenu.findMany({
      //    where: {
      //       role_id:1,
      //       menuList:{
      //          parent_id: null
      //       }
      //    },
      //    include:{
      //       menuList:{
      //          include:{
      //             childs: true
      //          }
      //       }
      //    },orderBy: {
      //       menu_id: "asc"
      //    }
      // })

      //  let menu = role.map(v => ({ ...v.menuList}) )
      if (!user) return res.status(404).json({
         code: "04",
         message: "User didn't match",
         data: {}
      })
      return res.json({
         code: "00",
         message: "Success",
         data: user,
      });
      
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
