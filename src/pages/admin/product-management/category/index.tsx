import { GetServerSideProps } from "next";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import prisma from "../../../../backend/_modules/prisma";
import { AdminLayout, Card, TableGrid, Button } from "../../../../components";
import {
   useGetAllQuery,
   useAddOrUpdateMutation,
   useDeleteMutation,
   useLazyGetAllQuery
} from "../../../../redux/services/admin/product-management/categoryPage";
import {
   layoutActions,
   layoutSelector,
} from "../../../../redux/slices/layouts/layoutSlice";
import authAdminMiddleware from "../../../../_modules/midleware/authAdminMiddleware";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { generateActionListFunction } from "../../../../_modules/helpers/generateAction";
import ModalAdd from "./_components/modalAdd";

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
   const [getAllcategory, { data = [], status }] = useLazyGetAllQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
   });
   const [addOrUpdate] = useAddOrUpdateMutation();
   const [deletecategory] = useDeleteMutation();
   const [openModalAdd, setModalAdd] = useState<boolean>(false);
   const [editMode, setEditMode] = useState<boolean>(false);
   const [dataEdit, setDataEdit] = useState<object>({});
   const [idDetail, setIdDetail] = useState(undefined);
   const { actionSelected } = useSelector(layoutSelector);
   const {
      data: { category = {}, categoryDetail = {} },
   }: any = useSession();
   useEffect(
      function () {
         getAllcategory({
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
         return category.email !== item.email;
      }
   };
   let actions = {
      async addCategory(){
         setModalAdd(true)
      },
      async view(data: any) {
         setModalAdd(true);
         setDataEdit({
            id: data.id,
            name: data.name_category,
            description: data.description,
            is_active: data.is_active === true,
         });
         setEditMode(true);
      },
      async updateCategory(data: any) {
         setModalAdd(true);
         setDataEdit({
            id: data.id,
            name: data.name_category,
            description: data.description,
            is_active: data.is_active === true,
         });
         setEditMode(true);
      },
      async deleteCategory(data: any) {
         Swal.fire({
            title: `Are you sure, delete category?`,
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
                     loadingText: "Deleting category. Please wait...",
                  })
               );
               try {
                  let rsp: any = await deletecategory({
                     id: data.id,
                  });
                  if (rsp.error) {
                     let { data = {} } = rsp.error || {};
                     disp(
                        layoutActions.openAlert({
                           title: `Error delete category`,
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
                              title: `delete category`,
                              type: "Warning",
                              message: message,
                           })
                        );
                     else {
                        disp(
                           layoutActions.openAlert({
                              title: `Delete category`,
                              type: "Success",
                              message: message,
                           })
                        );
                        getAllcategory({ filter, pagination });
                        setModalAdd(false);
                        modalRef.current?.reset();
                     }
                  }
               } catch (error: any) {
                  disp(
                     layoutActions.openAlert({
                        title: `Error Delete category`,
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
         {/* <ModalDetilcategory
            category_id={idDetail}
            show={modalDetil}
            onClose={() => {
               setModalDetil(false);
            }}
         /> */}
         <ModalAdd
            ref={modalRef}
            onSubmit={(valueForm: any) => {
               Swal.fire({
                  title: `Are you sure, ${
                     editMode ? "update a" : "add a new"
                  } category?`,
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
                           } category. Please wait...`,
                        })
                     );
                     try {
                        let rsp: any = await addOrUpdate(valueForm);
                        if (rsp.error) {
                           let { data = {} } = rsp.error || {};
                           disp(
                              layoutActions.openAlert({
                                 title: `Error ${
                                    editMode ? "update" : "create"
                                 } category`,
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
                                    } category`,
                                    type: "Warning",
                                    message: message,
                                 })
                              );
                           else {
                              disp(
                                 layoutActions.openAlert({
                                    title: `${
                                       editMode ? "Update" : "Create"
                                    } category`,
                                    type: "Success",
                                    message: message,
                                 })
                              );
                              getAllcategory({ filter, pagination });
                              setModalAdd(false);
                              modalRef.current?.reset();
                           }
                        }
                     } catch (error: any) {
                        disp(
                           layoutActions.openAlert({
                              title: `Error ${
                                 editMode ? "update" : "create"
                              } category`,
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
            <h2 className="text-xl font-bold">Category Management</h2>
            <span className="text-sm"> List of category  </span>
         </div>

         <div className="mt-2">
            <Card>
               <Card.Header>
                  <div className=" w-full">
                     List categorys
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
                           field: "name_category",
                        },
                        {
                           title: "Description",
                           field: "description",
                        },
                        {
                           title: "status",
                           field: "is_active",
                           onRender(item) {
                              if(item.is_active) return <span className=" rounded-3xl py-0 text-xs px-3 bg-primary-500 text-white"> Active </span>
                              return <span className=" rounded-3xl py-0 text-xs px-3 bg-secondary-500 text-white" >Not Active</span>
                           },
                        }
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
            session: dataSession
         },
      };
   });

Page.getLayout = AdminLayout;
