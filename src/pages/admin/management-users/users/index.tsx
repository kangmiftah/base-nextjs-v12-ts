import {  Role } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import prisma from "../../../../backend/_modules/prisma";
import {
   AdminLayout,
   Card,
   TableGrid,
   Button,
} from "../../../../components";
import {
   useGetAllUsersQuery,
   useLazyGetAllUsersQuery,
} from "../../../../redux/services/admin/users-management/usersPage";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";
import ModalAddUser from "./_components/modalAddUser";

export default function Page(props: {
   session: any, 
   roles: Array<{
      id: number, name: string
   }>
}): JSX.Element {
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
   const [getAlluser, { data = [], status }] = useLazyGetAllUsersQuery();
   const [openModalAdd, setModalAdd] = useState<boolean>(false);
   useEffect(
      function () {
         getAlluser({
            filter,
            pagination,
         });
      },
      [pagination]
   );
   const disp = useDispatch();
   return (
      <>
        <ModalAddUser 
         onSubmit={(valueForm)=>{
            console.log(valueForm)
         }}
         setModalAdd={setModalAdd}
         openModalAdd= {openModalAdd}
         roles={props.roles}
        />
         <div className="">
            <h2
               className="text-xl font-bold"
            >
               Users Management
            </h2>
            <span className="text-sm"> List of user admin </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>
                  <div className=" w-full">
                     List Users
                     <Button
                        className="float-right"
                        size={"sm"}
                        type="button"
                        color="primary"
                        onClick={() => setModalAdd(true)}
                     >
                        + Add User
                     </Button>
                  </div>
               </Card.Header>
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
      let roles : Array<{
         id: number, name: string
      }> = await prisma.role.findMany({
         select: {
            id: true, name: true
         }
      })
      return {
         props: {
            session,
            roles
         },
      };
   });

Page.getLayout = AdminLayout;
