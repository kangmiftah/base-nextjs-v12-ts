import { GetServerSideProps } from "next";
import authAdminMiddleware from "../../_modules/midleware/authAdminMiddleware";

export default () => {}

export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      return {
         props: {
            ...session,
         },
      };
   });
