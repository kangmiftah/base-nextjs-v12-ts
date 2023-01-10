import { GetServerSideProps } from "next";
import { AdminLayout } from "../../../components";
import authAdminMiddleware from "../../../_modules/midleware/authAdminMiddleware";

const Category  = () => {
    return ( <>Tes</> );
}
export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      let dataSession = session
 
      return {
         props: {
            session: dataSession,
         },
      };
   });
   
Category.getLayout = AdminLayout;
export default Category;
