import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { AdminLayout, Card, TableGrid } from "../../../../components";
import { useGetAllUsersQuery, useLazyGetAllUsersQuery } from "../../../../redux/services/admin/users-management/usersPage";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";

export default function Page(): JSX.Element {
   const [filter, setFilter] = useState<{ search: string }>({
      search: "",
   });
   const [pagination, setPagination] = useState<{
      page: number;
      show: number;
   }>({
      page: 1,
      show: 10,
   });
   const [getAlluser, {
      data = [],
      status,
   }] = useLazyGetAllUsersQuery();
   useEffect(function(){
      getAlluser({
         filter, pagination
      })
   },[pagination])
   return (
      <>
         <div className="">
            <h2 className="text-xl font-bold">Users Management</h2>
            <span className="text-sm"> List of user admin </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>List Users</Card.Header>
               <Card.Body className="">
                  <TableGrid
                     data={data || []}
                     isLoading={status !== "fulfilled"}
                     
                     withAction={true}
                     actionMenuType="DROPDOWN"
                     onChangePage={setPagination}
                     onChangeShow={setPagination}
                     currentPage={pagination.page}
                     currentShow={pagination.show}
                     actionsMenu={[
                        {
                           name: "Detail",
                           onClick(data, menu, indexMenu) {
                              console.log(data);
                           },
                           onRender(item) {
                              return true;
                           },
                        },
                        {
                           name: "Delete",
                           style: {
                              color: "red",
                           },
                           onClick(data, menu, indexMenu) {
                              console.log(data);
                           },
                           onRender(item) {
                              return item.name === "admin 1";
                           },
                        },
                     ]}
                     iterationNumber={true}
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
                              return item.role?.name;
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
