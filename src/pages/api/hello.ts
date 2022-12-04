// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


/**
 * @swagger
 * tags: ["Hello World "]
 * /api/hello/{id}/{d}:
 *   summary: Example for post
 *   post:
 *      requestBody:
 *        description: Optional Desc
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: integer
 *                name: 
 *                  type: string
 *      examples: { test: test }
 *      tags: ["Hello World "]
 *      description: Returns the hello world
 *      parameters: 
 *        - in: path
 *          name: id
 *          required: true
 *        - in: path
 *          name: d
 *          required: false
 *        - in: query
 *          name: xc
 *      responses:
 *        200:
 *          description: hello world
 */

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  res.status(200).json({ name: 'John Doe' })
}
