
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server";
import { optionsAuth } from "../../../pages/api/auth/[...nextauth]";
import { BaseResponseAPI } from '../../../@types/backend/response'

export default async function(res: NextApiResponse, req : NextApiRequest,  callback: (Function)){
   const session = await unstable_getServerSession(req, res, optionsAuth)
   let response: BaseResponseAPI = {
      code: "401",
      message: "Not authenticated",
      data : null
   }
   if (!session) {
      res.status(401).json(response)
     return;
   }
   return callback(session);
}