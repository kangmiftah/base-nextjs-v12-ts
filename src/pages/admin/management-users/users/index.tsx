import { Role } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import prisma from "../../../../backend/_modules/prisma";
import { AdminLayout, Card, TableGrid, Button } from "../../../../components";
import {
   useLazyGetAllUsersQuery,
   useAddOrUserMutation,
   useDeleteUserMutation,
} from "../../../../redux/services/admin/users-management/usersPage";
import {
   layoutActions,
   layoutSelector,
} from "../../../../redux/slices/layouts/layoutSlice";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";
import ModalAddUser from "./_components/modalAddUser";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import ModalDetilUser from "./_components/modalDetilUser";
import { useSelector } from "react-redux";
import { generateActionListFunction } from "../../../../_modules/helpers/generateAction";

export default function Page(props: {
   session: any;
   roles: Array<{
      id: number;
      name: string;
   }>;
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
   const [getAlluser, { data = [], status }] = useLazyGetAllUsersQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
   });
   const [addOrUser] = useAddOrUserMutation();
   const [deleteUser] = useDeleteUserMutation();
   const [openModalAdd, setModalAdd] = useState<boolean>(false);
   const [editMode, setEditMode] = useState<boolean>(false);
   const [dataEdit, setDataEdit] = useState<object>({});
   const [idDetail, setIdDetail] = useState(undefined);
   const { actionSelected } = useSelector(layoutSelector);
   const {
      data: { user = {}, userDetail = {} },
   }: any = useSession();
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
   const modalRef = useRef<HTMLFormElement>(null);
   useEffect(
      function () {
         if (!openModalAdd) {
            setEditMode(false);
            setDataEdit({});
         }
      },
      [openModalAdd]
   );
   let onRenderActions = {
      onRenderDelete(item: any){
         return user.email !== item.email;
      }
   };
   let actions = {
      async add(){
         setModalAdd(true)
      },
      async view(data: any) {
         setModalAdd(true);
         setDataEdit({
            id: data.id,
            name: data.name,
            email: data.email,
            role_id: data.role_id,
         });
         setEditMode(true);
      },
      async edit(data: any) {
         setModalAdd(true);
         setDataEdit({
            id: data.id,
            name: data.name,
            email: data.email,
            role_id: data.role_id,
         });
         setEditMode(true);
      },
      async delete(data: any) {
         Swal.fire({
            title: `Are you sure, delete user?`,
            text: "confirmation",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it",
         }).then(async (result) => {
            if (result.isConfirmed) {
               disp(
                  layoutActions.setLoading({
                     isLoading: true,
                     loadingText: "Deleting user. Please wait...",
                  })
               );
               try {
                  let rsp: any = await deleteUser({
                     id: data.id,
                  });
                  if (rsp.error) {
                     let { data = {} } = rsp.error || {};
                     disp(
                        layoutActions.openAlert({
                           title: `Error delete user`,
                           type: "Warning",
                           message: data.message,
                        })
                     );
                  } else {
                     let { data = {} } = rsp || {};
                     let { code = "01", message = "" } = data;
                     if (code !== "00")
                        disp(
                           layoutActions.openAlert({
                              title: `delete user`,
                              type: "Warning",
                              message: message,
                           })
                        );
                     else {
                        disp(
                           layoutActions.openAlert({
                              title: `Delete user`,
                              type: "Success",
                              message: message,
                           })
                        );
                        getAlluser({ filter, pagination });
                        setModalAdd(false);
                        modalRef.current?.reset();
                     }
                  }
               } catch (error: any) {
                  disp(
                     layoutActions.openAlert({
                        title: `Error Delete user`,
                        type: "Error",
                        message: error.toString(),
                     })
                  );
               }
               disp(
                  layoutActions.setLoading({
                     isLoading: false,
                     loadingText: "Loading. Please wait...",
                  })
               );
            }
         });
      },
   };
   const [modalDetil, setModalDetil] = useState<boolean>(false);
   return (
      <>
         <ModalDetilUser
            user_id={idDetail}
            show={modalDetil}
            onClose={() => {
               setModalDetil(false);
            }}
         />
         <ModalAddUser
            ref={modalRef}
            onSubmit={(valueForm: bodyUser) => {
               Swal.fire({
                  title: `Are you sure, ${
                     editMode ? "update a" : "add a new"
                  } user?`,
                  text: "confirmation",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes",
               }).then(async (result) => {
                  if (result.isConfirmed) {
                     disp(
                        layoutActions.setLoading({
                           isLoading: true,
                           loadingText: ` ${
                              editMode ? "Updating" : "Creating"
                           } user. Please wait...`,
                        })
                     );
                     try {
                        let rsp: any = await addOrUser(valueForm);
                        if (rsp.error) {
                           let { data = {} } = rsp.error || {};
                           disp(
                              layoutActions.openAlert({
                                 title: `Error ${
                                    editMode ? "update" : "create"
                                 } user`,
                                 type: "Warning",
                                 message: data.message,
                              })
                           );
                        } else {
                           let { data = {} } = rsp || {};
                           let { code = "01", message = "" } = data;
                           if (code !== "00")
                              disp(
                                 layoutActions.openAlert({
                                    title: `${
                                       editMode ? "Update" : "Create"
                                    } user`,
                                    type: "Warning",
                                    message: message,
                                 })
                              );
                           else {
                              disp(
                                 layoutActions.openAlert({
                                    title: `${
                                       editMode ? "Update" : "Create"
                                    } user`,
                                    type: "Success",
                                    message: message,
                                 })
                              );
                              getAlluser({ filter, pagination });
                              setModalAdd(false);
                              modalRef.current?.reset();
                           }
                        }
                     } catch (error: any) {
                        disp(
                           layoutActions.openAlert({
                              title: `Error ${
                                 editMode ? "update" : "create"
                              } user`,
                              type: "Error",
                              message: error.toString(),
                           })
                        );
                     }
                     disp(
                        layoutActions.setLoading({
                           isLoading: false,
                           loadingText: "Loading. Please wait...",
                        })
                     );
                  }
               });
            }}
            setModalAdd={setModalAdd}
            openModalAdd={openModalAdd}
            roles={props.roles}
            dataEdit={dataEdit}
            editMode={editMode}
         />
         <div className="">
            <h2 className="text-xl font-bold">Users Management</h2>
            <span className="text-sm"> List of user admin </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>
                  <div className=" w-full">
                     List Users
                     {
                        actionSelected.filter(v => v.type === "BUTTON_TOOLS").map(( act, iac ) =>(
                           <Button
                              key={iac}
                              className="float-right"
                              size={"sm"}
                              type="button"
                              color="primary"
                              onClick={actions[act.function_name as keyof typeof actions]}
                           >
                              {act.name}
                           </Button>
                        ))
                     }
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
                     actionsMenu={generateActionListFunction(actionSelected, actions, onRenderActions)}
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
                     pagination={true}
                  />
               </Card.Body>
            </Card>
         </div>
      </>
   );
}

export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      let dataSession = session;
      let roles: Array<{
         id: number;
         name: string;
      }> = await prisma.role.findMany({
         select: {
            id: true,
            name: true,
         },
      });
      return {
         props: {
            session: dataSession,
            roles,
         },
      };
   });

Page.getLayout = AdminLayout;
