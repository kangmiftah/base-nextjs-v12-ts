import { GetServerSideProps } from "next";
import { AdminLayout, Card, TableGrid } from "../../../../components"
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";





export default function Page() : JSX.Element{
   return <>
      <div className="">
         <h2 className="text-xl font-bold">Users Management</h2>
         <span className="text-sm"> List of user admin </span>
      </div>

      <div className="mt-2">
         <Card>
            <Card.Header>
               List Users
            </Card.Header>
            <Card.Body>
               <TableGrid 
               
               />
            </Card.Body>
            
         </Card>
      </div>
   </>
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