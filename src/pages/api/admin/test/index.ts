// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { authApiPublic } from "../../../../backend/_modules/middleware";

type Data = {
   name: string;
};

/**
 * @swagger
 * tags: ["Users"]
 * /api/users:
 *    post:
 *        requestBody:
 *            desctiption: users body
 *            content:
 *              application/json:
 *                schema:
 *                    $ref:
 *                        '#/components/schemas/Pet'
 *        tags: ["Users"]
 *        security:
 *            - bearerAuth: []
 *        description: Get All Users
 *        responses:
 *            200:
 *              description: hello world
 */

export default (req: NextApiRequest, res: NextApiResponse<BaseResponseAPI>) =>{

   res.json({
      code: "00",
      message: "Success",
      data: {},
   });
}