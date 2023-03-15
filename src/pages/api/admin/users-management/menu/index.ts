// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Menu } from "@prisma/client";
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
      if (req.method === "POST") return await addMenu(req, res, session);
      if (req.method === "PUT") return await updateMenu(req, res, session);
      if (req.method === "GET" && !detil) return await getAllMenus(req, res, session);
      if (req.method === "GET" && detil) return await getDetilMenu(req, res, session);
      if (req.method === "DELETE") return await deleteMenu(req, res, session);
      else
         return res.status(405).json({
            code: "05",
            message: "Method Not Allowed",
         });
   });

async function getAllMenus(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let query = req.query;
   let show: number = parseInt((query.show as string) || "0");
   let skip: number = (parseInt((query.page as string) || "01") - 1) * show;

   console.log({ query });
   let Menus = await prisma.menu.findMany({
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
      data: Menus,
   });
}
async function addMenu(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Menu> = {
      code: "00",
      message: "Menu berhasil di tambahkan",
   };

   try {
      
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.menu.create({
         data: {
            name: body.name,
            icon_type: body.icon_type,
            icon: body.icon,
            parent_id: body.hash_child ? null : body.parent_id,
            hash_child: body.jash_child,
            url: body.url,
            created_by: session?.userDetail?.id
         },
      });

      if (!data) throw new Error("Failed to create Menus");
      return res.status(201).json({
         code: "00",
         message: "Menu successfully u",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function updateMenu(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let body = req.body;
   let response: BaseResponseAPI<Menu> = {
      code: "00",
      message: "Menu berhasil di tambahkan",
   };

   try {
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.menu.update({
         where: {
            id: body.id,
         },
         data: {
            name: body.name,
            icon_type: body.icon_type,
            icon: body.icon,
            parent_id: body.hash_child ? null : body.parent_id,
            hash_child: body.jash_child,
            url: body.url,
            updated_at: moment(Date.now()).format(),
         },
      });

      if (!data) throw new Error("Failed to update Menus");
      return res.status(201).json({
         code: "00",
         message: "Menu successfully updated",
         data,
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}

async function deleteMenu(
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
      let deleted = await prisma.menu.delete({
         where: {
            id: parseInt(body.id),
         },
      });
      if (!deleted) throw new Error("Failed to delete Menu");
      return res.status(201).json({
         code: "00",
         message: "Menu successfully deleted",
      });
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
async function getDetilMenu(
   req: NextApiRequest,
   res: NextApiResponse<BaseResponseAPI>,
   session: any
) {
   let {detil = "0"} = req.query;
   console.log({ query : req.query });
   try {
      let Menu = await prisma.menu.findFirst({
         include:{
           childs: true
         },
         where: {
            AND: {
               id: parseInt(detil as string),
            },
         },
      });
      if (!Menu) return res.status(404).json({
         code: "04",
         message: "Menu didn't match",
         data: {}
      })
      return res.json({
         code: "00",
         message: "Success",
         data: Menu,
      });
      
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
