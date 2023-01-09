// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { bodyUser } from "../../../../../@types/backend/admin/users-management";
import { BaseResponseAPI } from "../../../../../@types/backend/response";
import { authApiAdmin } from "../../../../../backend/_modules/middleware";
import prisma from "../../../../../backend/_modules/prisma";
import exclude from "../../../../../backend/_modules/prisma/excludeFields";
import * as bcrypt from "bcrypt";

type Data = {
   name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<BaseResponseAPI>) =>
   authApiAdmin(res, req, async function (session: any) {
      if (req.method === "POST") return await addUser(req, res, session);
      let query = req.query;
      let show: number = parseInt((query.show as string) || "0");
      let skip: number = (parseInt((query.page as string) || "01") - 1) * show;
      console.log({ query });
      let users = await prisma.users.findMany({
         select: {
            id: true,
            email: true,
            name: true,
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
   });

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
            message: "Name is field required",
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
           created_by: session.userDetail?.id || null,
           is_public: false
         },
      });

      if (!data) throw new Error("Failed to create users");
      return res.status(201).json({
         code: "00",
         message: "User successfully created",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
