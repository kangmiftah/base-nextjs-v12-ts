import { GetServerSideProps } from "next";
import { AdminLayout, Card, TableGrid } from "../../../../components";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";

export default function Page(): JSX.Element {
   return (
      <>
         <div className="">
            <h2 className="text-xl font-bold">Users Management</h2>
            <span className="text-sm"> List of user admin </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>List Users</Card.Header>
               <Card.Body
                  className=""
               >
                  <TableGrid
                     data={[
                        {
                           name: "admin 1",
                           email: "admin1@email.com",
                           role : "1"
                        },
                        
                        {
                           name: "admin 2",
                           email: "admin2@email.com",
                           role: "2",
                        }
                     ]}
                     isLoading={false}
                     withAction={true}
                     actionMenuType="DROPDOWN"
                     actionsMenu={[
                        {
                           name:"Detail",
                           onClick(data, menu, indexMenu) {
                              console.log(data)
                           },
                           onRender(item) {
                              return true
                           },
                        },{
                           name:"Delete",
                           style:{
                              color:"red"
                           },
                           onClick(data, menu, indexMenu) {
                              console.log(data)
                           },
                           onRender(item) {
                              return item.name === "admin 1"
                           },
                        },
                     ]}
                     iterationNumber={false}
                     columns={[
                        {
                           title: "Name",
                           field: "name",
                        },
                        {
                           title: "Email",
                           field: "email",
                        },
                        {
                           title: "Role",
                           field: "role",
                           onRender(item) {
                              return item.role === "1" ? "Root Admin":
                              item.role === "2" ? "Admin Pemasaran" :
                              "Admin"
                           },
                        },
                     ]}
                  />
               </Card.Body>
            </Card>
         </div>
      </>
   );
}

export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      console.log(session);
      return {
         props: {
            ...session,
         },
      };
   });

Page.getLayout = AdminLayout;
