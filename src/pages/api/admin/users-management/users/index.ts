// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseResponseAPI } from "../../../../../@types/backend/response";
import { authApiAdmin } from "../../../../../backend/_modules/middleware";
import prisma from "../../../../../backend/_modules/prisma";
import exclude from "../../../../../backend/_modules/prisma/excludeFields";

type Data = {
   name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<BaseResponseAPI>) =>
   authApiAdmin(res, req, async function (session: any) {
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
                     mode:"insensitive"
                  },
               },
               {
                  name: {
                     endsWith: query.search as string,
                     startsWith: query.search as string,
                     mode:"insensitive"
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
