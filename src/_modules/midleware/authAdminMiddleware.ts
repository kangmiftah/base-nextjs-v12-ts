import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default async function (
   context: GetServerSidePropsContext,
   callback: (session: Session | null) => any
) {
   let session: any= await getSession(context);
   console.log("session FE ADMIN", session?.ADMIN);
   if (!session?.ADMIN) {
      return {
         redirect: {
            permanent: false,
            destination: "/",
         },
         props: {},
      };
   }
   return callback(session.ADMIN);
}
