import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default async function (
   context: GetServerSidePropsContext,
   callback: (session: Session | null) => any
) {
   let session: Session | null= await getSession(context);
   console.log("session FE PUBLIC", session);
   if (!session) {
      return {
         redirect: {
            permanent: false,
            destination: "/",
         },
         props: {},
      };
   }
   return callback(session);
}
