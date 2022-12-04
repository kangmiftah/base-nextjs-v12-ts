import { withSwagger } from "next-swagger-doc";
import { NextApiRequest, NextApiResponse } from "next";

const swaggerHandler = withSwagger({
   definition: {
      openapi: "3.0.0",
      info: {
         title: "E-Commerce App Swagger",
         version: "0.1.0",
      },
      components: {
         securitySchemes: {
            bearerAuth: {
               type: "http",
               scheme: "bearer",
               bearerFormat: "JWT" 
            },
            basicAuth: {
               type: "http",
               scheme: "basic",
            },
            cookieAuth: {
               type:"apiKey",
               in: "cookie",
               name: "SESSIONID"
            }
         },
         schemas: {
            Pet: {
               type: "object",
               properties: {
                  id: {
                     type : "integer",
                  },
                  name: {
                     type : "string"
                  }
               }
            }
         }
      },
   },
   apiFolder: "src/pages/api",
});

export default process.env.NODE_ENV === "production"
   ? (req: NextApiRequest, res: NextApiResponse) => {
        res.status(404);
     }
   : swaggerHandler();
