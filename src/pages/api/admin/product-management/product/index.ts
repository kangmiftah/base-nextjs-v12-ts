// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseResponseAPI } from "../../../../../@types/backend/response";
import { authApiAdmin } from "../../../../../backend/_modules/middleware";
import prisma from "../../../../../backend/_modules/prisma";
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
   res: NextApiResponse<BaseResponseAPI<Array<Product>>>,
   session: any
) {
   let query = req.query;
   let show: number = parseInt((query.show as string) || "0");
   let skip: number = (parseInt((query.page as string) || "01") - 1) * show;

   console.log({ query });
   let Categories = await prisma.product.findMany({
      take: show,
      skip,
      where: {
         OR: [
            {
               name_product: {
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
   let response: BaseResponseAPI<Product> = {
      code: "00",
      message: "Produk berhasil di tambahkan",
   };

   try {
      console.log({body})
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.product.create({
         data: {
            name_product: body.name,
            description: body.description,
            created_by: session?.userDetail?.id ,
            price: body.price,
            discount: body.discount,
            stock: body.stock,
            rate: 0,
            category_id: body.category_id,
            is_active: false
         },
      });

      if (!data) throw new Error("Failed to create product");
      return res.status(201).json({
         code: "00",
         message: "Product successfully created",
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
   let response: BaseResponseAPI<Product> = {
      code: "00",
      message: "Product berhasil di tambahkan",
   };

   try {
      if (!body.name)
         return res.status(400).json({
            code: "01",
            message: "Name is field required",
         });

      let data = await prisma.product.update({
         where: {
            id: body.id,
         },
         data: {
            name_product: body.name,
            description: body.description,
            price: body.price,
            discount: body.discount,
            stock: body.stock,
            rate: 0,
            category_id: body.category_id,
            
            is_active: false
         },
      });

      if (!data) throw new Error("Failed to update Product");
      return res.status(201).json({
         code: "00",
         message: "Product successfully updated",
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
      let deleted = await prisma.product.delete({
         where: {
            id: parseInt(body.id),
         },
      });
      if (!deleted) throw new Error("Failed to delete product");
      return res.status(201).json({
         code: "00",
         message: "Product successfully deleted",
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
   res: NextApiResponse<BaseResponseAPI<Product | {}>>,
   session: any
) {
   let {detil = "0"} = req.query;
   console.log({ query : req.query });
   try {
      let Product = await prisma.product.findFirst({
         where: {
            AND: {
               id: parseInt(detil as string),
            },
         },
      });
      if (!Product) return res.status(404).json({
         code: "04",
         message: "Product didn't match",
         data: {}
      })
      return res.json({
         code: "00",
         message: "Success",
         data: Product,
      });
      
   } catch (error: any) {
      return res.status(500).json({
         code: "99",
         message: error.toString(),
      });
   }
}
