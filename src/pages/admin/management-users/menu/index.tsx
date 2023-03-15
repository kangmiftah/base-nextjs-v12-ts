import { Role } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import prisma from "../../../../backend/_modules/prisma";
import { AdminLayout, Card, TableGrid, Button } from "../../../../components";
import {
   useLazyGetAllMenusQuery,
   useAddOrUpdateMenusMutation,
   useDeleteMenusMutation
} from "../../../../redux/services/admin/users-management/menuPage";
import { layoutActions } from "../../../../redux/slices/layouts/layoutSlice";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";
import ModalAddMenu from "./_components/modalAddMenu";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import ModalDetilMenu from "./_components/modalDetilMenu";

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
   const [getAllMenu, { data = [], status }] = useLazyGetAllMenusQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
   });
   const [addOrMenu] = useAddOrUpdateMenusMutation();
   const [deleteMenu] = useDeleteMenusMutation();
   const [openModalAdd, setModalAdd] = useState<boolean>(false);
   const [editMode, setEditMode] = useState<boolean>(false);
   const [dataEdit, setDataEdit] = useState<object>({});
   const [idDetail, setIdDetail] = useState(undefined)
   const { data: {
      Menu={}, MenuDetail={}
   } } : any = useSession();
   useEffect(
      function () {
         getAllMenu({
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
   const [modalDetil, setModalDetil] = useState<boolean>(false)
   return (
      <>
         <ModalDetilMenu menu_id={idDetail} show={modalDetil}  onClose={()=>{
            setModalDetil(false)
         }} />
         <ModalAddMenu
            ref={modalRef}
            onSubmit={(valueForm: any) => {
               Swal.fire({
                  title: `Are you sure, ${
                     editMode ? "update a" : "add a new"
                  } Menu?`,
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
                           } Menu. Please wait...`,
                        })
                     );
                     try {
                        let rsp: any = await addOrMenu(valueForm);
                        if (rsp.error) {
                           let { data = {} } = rsp.error || {};
                           disp(
                              layoutActions.openAlert({
                                 title: `Error ${
                                    editMode ? "update" : "create"
                                 } Menu`,
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
                                    } Menu`,
                                    type: "Warning",
                                    message: message,
                                 })
                              );
                           else {
                              disp(
                                 layoutActions.openAlert({
                                    title: `${
                                       editMode ? "Update" : "Create"
                                    } Menu`,
                                    type: "Success",
                                    message: message,
                                 })
                              );
                              getAllMenu({ filter, pagination });
                              setModalAdd(false);
                              modalRef.current?.reset();
                           }
                        }
                     } catch (error: any) {
                        disp(
                           layoutActions.openAlert({
                              title: `Error ${
                                 editMode ? "update" : "create"
                              } Menu`,
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
            <h2 className="text-xl font-bold">Menu Management</h2>
            <span className="text-sm"> List of Menu App </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>
                  <div className=" w-full">
                     List Menu
                     <Button
                        className="float-right"
                        size={"sm"}
                        type="button"
                        color="primary"
                        onClick={() => setModalAdd(true)}
                     >
                        + Add Menu
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
                              setModalDetil(true)
                              setIdDetail(data.id)
                           },
                           onRender(item) {
                              return true;
                           },
                        },
                        {
                           name: "Edit Menu",
                           onClick(data, menu, indexMenu) {
                              setModalAdd(true);
                              setDataEdit({
                                 id: data.id,
                                 name: data.name,
                                 email: data.email,
                                 role_id: data.role_id,
                              });
                              setEditMode(true);
                           },
                        },
                        {
                           name: "Delete Menu",
                           style: {
                              color: "red",
                           }, onRender(item) {
                              return false
                           },
                           onClick(data, menu, indexMenu) {
                              Swal.fire({
                                 title: `Are you sure, delete Menu?`,
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
                                             "Deleting Menu. Please wait...",
                                       })
                                    );
                                    try {
                                       let rsp: any = await deleteMenu(
                                          {
                                             id: data.id
                                          }
                                       );
                                       if (rsp.error) {
                                          let { data = {} } = rsp.error || {};
                                          disp(
                                             layoutActions.openAlert({
                                                title: `Error delete Menu`,
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
                                                   title: `delete Menu`,
                                                   type: "Warning",
                                                   message: message,
                                                })
                                             );
                                          else {
                                             disp(
                                                layoutActions.openAlert({
                                                   title: `Delete Menu`,
                                                   type: "Success",
                                                   message: message,
                                                })
                                             );
                                             getAllMenu({ filter, pagination });
                                             setModalAdd(false);
                                             modalRef.current?.reset();
                                          }
                                       }
                                    } catch (error: any) {
                                       disp(
                                          layoutActions.openAlert({
                                             title: `Error Delete Menu`,
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
                        },
                     ]}
                     iterationNumber={true}
                     columns={[
                        {
                           title: "Name",
                           field: "name",
                        },
                        {
                           title: "URL",
                           field: "url",
                        },
                        {
                           title: "Have Child",
                           field: "hash_child",
                           onRender(item){
                              return String(item.hash_child).toLocaleUpperCase()
                           } 
                        },
                        {
                           title: "Icon Type",
                           field: "icon_type",
                        },
                        
                        {
                           title: "Icon",
                           field: "icon",
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
      let dataSession = session
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
