import { Role } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import prisma from "../../../../backend/_modules/prisma";
import { AdminLayout, Card, TableGrid, Button } from "../../../../components";
import {
   layoutActions,
   layoutSelector,
} from "../../../../redux/slices/layouts/layoutSlice";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";
import ModalAddRole from "./_components/modalAddRole";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import ModalDetilRole from "./_components/modalDetilRole";
import {
   useAddOrUpdateRolesMutation,
   useDeleteRolesMutation,
   useLazyGetAllRolesQuery,
} from "../../../../redux/services/admin/users-management/rolesPage";
import ModalAccessMenu from "./_components/modalAccessMenu";
import { useSelector } from "react-redux";
import { generateActionListFunction } from "../../../../_modules/helpers/generateAction";

export default function Page(props: { session: any }): JSX.Element {
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
   const [getAllRoles, { data = [], status }] = useLazyGetAllRolesQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
   });
   const { actionSelected } = useSelector(layoutSelector);
   const [addOrRole] = useAddOrUpdateRolesMutation();
   const [deleteRole] = useDeleteRolesMutation();
   const [openModalAdd, setModalAdd] = useState<boolean>(false);
   const [editMode, setEditMode] = useState<boolean>(false);
   const [accessMenu, setAccessMenu] = useState<boolean>(false);
   const [dataEdit, setDataEdit] = useState<object>({});
   const [idDetail, setIdDetail] = useState(undefined);
   const {
      data: { user = {}, userDetail = {} },
   }: any = useSession();
   useEffect(
      function () {
         getAllRoles({
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
            modalRef.current?.reset();
         }
      },
      [openModalAdd]
   );
   const [modalDetil, setModalDetil] = useState<boolean>(false);
   const onRenderActions = {
      async onRenderDelete(item: any) {
         return userDetail?.role_id !== item.id;
      },
   };
   const actions = {
      async detailRole(data: any) {
         setModalDetil(true);
         setIdDetail(data.id);
      },
      async updateRole(data: any) {
         setModalAdd(true);
         setDataEdit({
            id: data.id,
            name: data.name,
            description: data.description,
         });
         setEditMode(true);
      },
      async accessMenu(data: any) {
         setAccessMenu(true);
         setIdDetail(data.id);
      },
      async deleteRole(data: any) {
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
                     loadingText:
                        "Deleting role. Please wait...",
                  })
               );
               try {
                  let rsp: any = await deleteRole({
                     id: data.id,
                  });
                  if (rsp.error) {
                     let { data = {} } = rsp.error || {};
                     disp(
                        layoutActions.openAlert({
                           title: `Error delete role`,
                           type: "Warning",
                           message: data.message,
                        })
                     );
                  } else {
                     let { data = {} } = rsp || {};
                     let { code = "01", message = "" } =
                        data;
                     if (code !== "00")
                        disp(
                           layoutActions.openAlert({
                              title: `delete role`,
                              type: "Warning",
                              message: message,
                           })
                        );
                     else {
                        disp(
                           layoutActions.openAlert({
                              title: `Delete role`,
                              type: "Success",
                              message: message,
                           })
                        );
                        getAllRoles({
                           filter,
                           pagination,
                        });
                        setModalAdd(false);
                        modalRef.current?.reset();
                     }
                  }
               } catch (error: any) {
                  disp(
                     layoutActions.openAlert({
                        title: `Error Delete role`,
                        type: "Error",
                        message: error.toString(),
                     })
                  );
               }
               disp(
                  layoutActions.setLoading({
                     isLoading: false,
                     loadingText:
                        "Loading. Please wait...",
                  })
               );
            }
         });
      },
      async addRole(data: any) {
         setModalAdd(true)
      },
   };
   return (
      <>
         <ModalAccessMenu
            role_id={idDetail}
            show={accessMenu}
            onClose={() => {
               setAccessMenu(false);
            }}
         />
         <ModalDetilRole
            role_id={idDetail}
            show={modalDetil}
            onClose={() => {
               setModalDetil(false);
            }}
         />
         <ModalAddRole
            ref={modalRef}
            onSubmit={(valueForm: bodyUser) => {
               Swal.fire({
                  title: `Are you sure, ${
                     editMode ? "update a" : "add a new"
                  } role?`,
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
                           } role. Please wait...`,
                        })
                     );
                     try {
                        let rsp: any = await addOrRole(valueForm);
                        if (rsp.error) {
                           let { data = {} } = rsp.error || {};
                           disp(
                              layoutActions.openAlert({
                                 title: `Error ${
                                    editMode ? "update" : "create"
                                 } role`,
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
                                    } role`,
                                    type: "Warning",
                                    message: message,
                                 })
                              );
                           else {
                              disp(
                                 layoutActions.openAlert({
                                    title: `${
                                       editMode ? "Update" : "Create"
                                    } role`,
                                    type: "Success",
                                    message: message,
                                 })
                              );
                              getAllRoles({ filter, pagination });
                              setModalAdd(false);
                              modalRef.current?.reset();
                           }
                        }
                     } catch (error: any) {
                        disp(
                           layoutActions.openAlert({
                              title: `Error ${
                                 editMode ? "update" : "create"
                              } role`,
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
            dataEdit={dataEdit}
            editMode={editMode}
         />
         <div className="">
            <h2 className="text-xl font-bold">Role Management</h2>
            <span className="text-sm"> List of role admin </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>
                  <div className=" w-full">
                     List Roles

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
                           title: "Description",
                           field: "description",
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
      return {
         props: {
            session: dataSession,
         },
      };
   });

Page.getLayout = AdminLayout;
