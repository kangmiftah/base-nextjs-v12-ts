// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from "@prisma/client";
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
      if (req.method === "POST") return await add(req, res, session);
      if (req.method === "PUT") return await update(req, res, session);
      if (req.method === "GET" && !detil) return await getAll(req, res, session);
      if (req.method === "GET" && detil) return await getDetil(req, res, session);
      if (req.method === "DELETE") return await delete_(req, res, session);
      else
         return res.status(405).json({
            code: "05",
            message: "Method Not Allowed",
         });
   });

async function getAll(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI<Array<Category>>>,
   session: any
) {
   let query = req.query;
   let show: number = parseInt((query.show as string) || "0");
   let skip: number = (parseInt((query.page as string) || "01") - 1) * show;

   console.log({ query });
   let Categories = await prisma.category.findMany({
      take: show,
      skip,
      where: {
         OR: [
            {
               name_category: {
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
      data: Categories,
   });
}
async function add(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Category> = {
      code: "00",
      message: "Category berhasil di tambahkan",
   };

   try {
      
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.category.create({
         data: {
            name_category: body.name,
            description: body.description,
            created_by: session?.userDetail?.id ,
            is_active: false
         },
      });

      if (!data) throw new Error("Failed to create Categories");
      return res.status(201).json({
         code: "00",
         message: "Category successfully u",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function update(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Category> = {
      code: "00",
      message: "Category berhasil di tambahkan",
   };

   try {
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.category.update({
         where: {
            id: body.id,
         },
         data: {
            name_category: body.name,
            description: body.description,
            is_active: body.is_active || false
         },
      });

      if (!data) throw new Error("Failed to update Categories");
      return res.status(201).json({
         code: "00",
         message: "Category successfully updated",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function delete_(
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
      let deleted = await prisma.category.delete({
         where: {
            id: parseInt(body.id),
         },
      });
      if (!deleted) throw new Error("Failed to delete Categories");
      return res.status(201).json({
         code: "00",
         message: "Category successfully deleted",
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
async function getDetil(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI<Category | {}>>,
   session: any
) {
   let {detil = "0"} = req.query;
   console.log({ query : req.query });
   try {
      let Category = await prisma.category.findFirst({
         where: {
            AND: {
               id: parseInt(detil as string),
            },
         },
      });
      if (!Category) return res.status(404).json({
         code: "04",
         message: "Category didn't match",
         data: {}
      })
      return res.json({
         code: "00",
         message: "Success",
         data: Category,
      });
      
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
