import { GetServerSideProps } from "next";
import { AdminLayout } from "../../../../components"
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";





export default function Page() : JSX.Element{
   return <>menu</>
}



export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      console.log(session)
      return {
         props: {
            ...session,
         },
      };
   });


Page.getLayout = AdminLayout;