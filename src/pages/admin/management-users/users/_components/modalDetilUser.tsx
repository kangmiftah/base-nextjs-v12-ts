import classNames from "classnames";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, TableDetail, Button } from "../../../../../components";
import TableGrid from "../../../../../components/table-grid";
import { useGetDetilMutation } from "../../../../../redux/services/admin/users-management/usersPage";
import { layoutActions } from "../../../../../redux/slices/layouts/layoutSlice";

interface detilProps {
   user_id?: number;
   show: boolean;
   onClose: () => any;
}

export default function ModalDetilUser(props: detilProps) {
   const [childDetil, setChildDetil] = useState<Array<any>>([]);
   const [detil, setDetil] = useState({});
   const [getDetail] = useGetDetilMutation();
   const [loading, setLoading] = useState<boolean>(false);
   const disp = useDispatch();
   useEffect(
      function () {
         if (props.show && props.user_id) {
            (async function () {
               setLoading(true);
               try {
                  let { data = {} }: any = await getDetail({
                     detil: parseInt((props.user_id || 0).toString()),
                  });
                  if (data.code !== "00")
                     disp(
                        layoutActions.openAlert({
                           title: `Error get detail user`,
                           type: "Warning",
                           message: data.message,
                        })
                     );
                  else setDetil(data.data || {});
               } catch (error: any) {
                  disp(
                     layoutActions.openAlert({
                        title: `Error get detail user`,
                        type: "Error",
                        message: error.toString(),
                     })
                  );
               }
               setLoading(false);
            })();
         }
      },
      [props.show, props.user_id]
   );
   return (
      <Modal
         backdrop="static"
         size="xl"
         onHide={props.onClose}
         showModal={props.show}
      >
         <Modal.Header closeBtn>Detail Users</Modal.Header>
         <Modal.Body>
            <TableDetail
               item={detil}
               fieldList={[
                  {
                     title: "Name",
                     fieldName: "name",
                  },
                  {
                     title: "Email",
                     fieldName: "email",
                  },
                  {
                     title: "Role",
                     fieldName: "role",
                     onRenderValue: (item: any) => item.role?.name,
                  },
                  {
                     title: "Access Menu",
                     onRenderValue: (item: any) => (
                        <div className="grid grid-flow-row">
                           <ol className="">
                              {(item.role?.menuList || [])
                                 .map((v: any) => ({ ...(v.menuList || []) }))
                                 .map((data: any = {}, i: number) => (
                                    // <div>
                                    <li key={i} className={`${classNames({
                                       "flex " :  !data.hash_child
                                    })} justify-between p-1 pl-2  odd:bg-white border-b even:bg-gray-100`}>
                                       <span className=" font-bold">{data?.name || ""}{" "}</span>
                                       {!data.hash_child && <span>( {data.url} )</span>}
                                       {data.hash_child && (
                                          <ul className="mt-3 ml-0 w-full ">
                                             {(data.childs || []).map(
                                                (
                                                   { name, url }: any,
                                                   ic: number
                                                ) => (
                                                   <li
                                                      key={`child-${ic}`}
                                                      className="flex pr-5 pl-5 justify-between odd:bg-white even:bg-gray-100 p-1"
                                                   >
                                                      <span className="font-semibold">{name} </span>{" "}
                                                      <span> ( {url} )</span>
                                                   </li>
                                                )
                                             )}
                                          </ul>
                                       )}
                                    </li>
                                    // </div>
                                 ))}
                           </ol>
                        </div>
                     ),
                     // onRender: (item: any, fieldName: string) => {
                     //    console.log(item)
                     //    return (
                     //       <>
                     //          <div className="grid grid-flow-row mt-5">
                     //             <div className="mb-3">
                     //                <h5 className="">Access Menu</h5>
                     //             </div>
                     //             <div>
                     //                <TableGrid
                     //                   maxHeight={300}
                     //                   isLoading={false}
                     //                   withAction={false}
                     //                   iterationNumber={true}
                     //                   pagination={false}
                     //                   data={(item.role?.menuList || []).map( (v: any) => ({ ...(v.menuList || [])}))}
                     //                   withChild={true}
                     //                   loadingChild={false}
                     //                   // onOpenChild={(item) => {
                     //                   //    setChildDetil(item.childs);
                     //                   // }}
                     //                   renderChild={(child) => {
                     //                      return (
                     //                         <div className="w-full py-1 px-3 mt-3">
                     //                            <TableGrid
                     //                               headerSize="small"
                     //                               maxHeight={200}
                     //                               minHeight={100}
                     //                               isLoading={false}
                     //                               withAction={false}
                     //                               iterationNumber={true}
                     //                               pagination={false}
                     //                               data={child?.childs || []}
                     //                               columns={[
                     //                                  {
                     //                                     title: "Name",
                     //                                     field: "name",
                     //                                  },

                     //                                  {
                     //                                     title: "URL",
                     //                                     field: "url",
                     //                                  },
                     //                               ]}
                     //                            />
                     //                         </div>
                     //                      );
                     //                   }}
                     //                   columns={[
                     //                      {
                     //                         title: "Name",
                     //                         field: "name",
                     //                      },

                     //                      {
                     //                         title: "URL",
                     //                         field: "url",
                     //                      },
                     //                   ]}
                     //                />
                     //             </div>
                     //          </div>
                     //       </>
                     //    );
                     // },
                  },
               ]}
            />
         </Modal.Body>
         <Modal.Footer>
            <div className="flex justify-end items-center align-middle">
               <Button color="secondary" onClick={props.onClose}>
                  {" "}
                  Close{" "}
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
