import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../../backend/_modules/prisma";
import cfg  from '../../app.config';

export default async function (
   context: GetServerSidePropsContext,
   callback: (session: any | object) => any,
   type? : "ACTION" | "MAIN_PAGE" | "SUB_PAGE"
) {
   if (!type) type = "MAIN_PAGE";
   let session: Session | null= await getSession(context);
   let dataSession: any = { ...session}
   if (!session) {
      return {
         redirect: {
            permanent: false,
            destination: "/login",
         },
         props: {},
      };
   }
   if (type === "MAIN_PAGE"){
      
      let detilUser : any = (session as any).userDetail || {}
      let url = context.resolvedUrl.replace(`/${cfg.SUB_DOMAIN_ADMIN}`, "");
      let check_ = await prisma.menu.findFirst({
         where: {
            AND: {
               hash_child: false,
               url: url,
               roleList: {
                  some: {
                     roleList: {
                        
                        userList: {
                           some: {
                              id: detilUser.id || "",
                              is_public: false
                           }
                        }
                     }
                  }
               }
            }
         }
      })
      console.log({url, check_})
      if(!check_) return {
         notFound: true,
         props: {},
      }
   }

   return callback(dataSession);
}
