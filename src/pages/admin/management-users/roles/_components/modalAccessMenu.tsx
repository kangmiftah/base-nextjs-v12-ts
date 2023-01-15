import { Button, Form, Modal, Input } from "../../../../../components";
import { BiSearchAlt, BiChevronLeft } from "react-icons/bi";
import {
   useAccessMenuMutation,
   useGetAccessMenuMutation,
} from "../../../../../redux/services/admin/users-management/rolesPage";
import React from "react";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../../../redux/slices/layouts/layoutSlice";
import classNames from "classnames";

function LoadingSkeleton(): JSX.Element {
   return (
      <div className="h-[25px] animate-pulse">
         <div className="h-full bg-[#D9D9D9] rounded-md">
            <div className="h-full bg-[#969696] rounded-md"></div>
         </div>
      </div>
   );
}
export default function ModalAccessMenu(props: {
   role_id?: number;
   show: boolean;
   onClose: () => any;
}): JSX.Element {
   const [getAccessMenu] = useGetAccessMenuMutation();
   const disp = useDispatch();
   const [search, setSearch] = React.useState<string>("");
   const [loading, setLoading] = React.useState<boolean>(false);
   const [dataAccess, setDataAccess] = React.useState<Array<any>>([]);
   const [setAccessMenu] = useAccessMenuMutation();
   const getData = async (withLoading: boolean = false) => {
      withLoading && setLoading(true);
      try {
         let { data }: any = await getAccessMenu({
            role_id: props.role_id,
            search,
         });
         if (data.code === "00") setDataAccess(data.data);
      } catch (error: any) {
         disp(
            layoutActions.openAlert({
               title: `Error  get access menu`,
               type: "Error",
               message: error.toString(),
            })
         );
      }
      setLoading(false);
   };
   React.useEffect(
      function () {
         if (props.show) getData(false);
      },
      [props.role_id, props.show]
   );
   const [actionActive, setActionActive] = React.useState<string>("");
   function changeActiveAction(key: string) {
      console.log(key);
      setActionActive((v) => (v === key ? "" : key));
   }

   React.useEffect(
      function () {
         !props.show && setSearch("");
      },
      [props.show]
   );

   async function setMenuRole(params: any) {
      try {
         let { data }: any = await setAccessMenu(params);
         if (data.code === "00") getData();
      } catch (error: any) {
         disp(
            layoutActions.openAlert({
               title: `Error  set access menu`,
               type: "Error",
               message: error.toString(),
            })
         );
      }
   }

   return (
      <Modal
         onHide={props.onClose}
         showModal={props.show}
         size="xl"
         backdrop="static"
      >
         <Modal.Header closeBtn>Role Access Menu</Modal.Header>
         <Modal.Body>
            {/* <Form
               onSubmit={({ search }: any) =>
                  getData({ role_id: props.role_id, search })
               }
            > */}
            <div className="flex border-b pb-4 pt-2">
               <Input.Text
                  placeholder="search menu"
                  name="search"
                  onKeyUp={(e) => e.keyCode === 13 && getData()}
                  className="mr-2"
                  sizeinput="sm"
                  value={search}
                  onChange={(e: React.SyntheticEvent) => {
                     let target = e.target as HTMLInputElement;
                     setSearch(target.value);
                  }}
               />
               <Button
                  type="button"
                  onClick={() => getData()}
                  size={"sm"}
                  className=""
               >
                  <BiSearchAlt />
               </Button>
            </div>
            <div className="">
               <dl>
                  <div
                     className={classNames(
                        "px-2 py-2 grid grid-cols-3 sm:gap-4 bg-gray-200 font-bold"
                     )}
                  >
                     <dt>Name </dt>
                     <dt>URL </dt>
                     <dt className="text-right">Access Role </dt>
                  </div>
                  {(loading ? [1, 2, 3, 4, 5] : dataAccess).map((itm, i) => {
                     let mainName = itm.name;
                     if ((itm.actions || []).length > 0) {
                        mainName = (
                           <div className="flex justify-start items-center">
                              <button
                                 onClick={() =>
                                    !loading &&
                                    (itm.actions || []).length > 0 &&
                                    changeActiveAction(String(i))
                                 }
                                 className="p-1 "
                              >
                                 {" "}
                                 <BiChevronLeft
                                    className={classNames(
                                       "mr-1  duration-300 transform transition-all ease-in-out",
                                       {
                                          "-rotate-90":
                                             actionActive === String(i),
                                       }
                                    )}
                                 />{" "}
                              </button>
                              {itm.name}
                           </div>
                        );
                     }
                     return (
                        <div
                           key={i}
                           className="  duration-300 transform transition-all ease-in-out"
                        >
                           <div
                              className={classNames(
                                 "pr-2 py-2 pl-5 grid grid-cols-3 sm:gap-4",
                                 {
                                    "bg-gray-100": i % 2 === 1,
                                    "bg-white": i % 2 === 0,
                                    // "cursor-pointer hover:bg-gray-300":
                                    //    !loading &&
                                    //    (itm.actions || []).length > 0,
                                 }
                              )}
                           >
                              <dd className="text-sm font-medium text-gray-900">
                                 {loading ? <LoadingSkeleton /> : mainName}
                              </dd>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                 {loading ? <LoadingSkeleton /> : itm.url}
                              </dd>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 text-right">
                                 {loading ? (
                                    <LoadingSkeleton />
                                 ) : (
                                    <input
                                       checked={itm.access_role}
                                       disabled={itm.id === 1}
                                       onChange={(e)=>setMenuRole({
                                          menu_id : itm.id,
                                          role_id:props.role_id,
                                          type:"MENU",
                                          accessed: e.target.checked
                                       })}
                                       id="default-checkbox"
                                       type="checkbox"
                                       className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600"
                                    />
                                 )}
                              </dd>
                              {!loading &&
                                 itm.hash_child &&
                                 (itm.childs || []).map(
                                    (ch: any, ic: number) => {
                                       let submainName = ch.name;
                                       if ((ch.actions || []).length > 0) {
                                          submainName = (
                                             <div className="flex justify-start items-center">
                                                <button
                                                   onClick={() =>
                                                      !loading &&
                                                      (ch.actions || [])
                                                         .length > 0 &&
                                                      changeActiveAction(
                                                         `ic-${ic}`
                                                      )
                                                   }
                                                   className="p-1 focus:ring-0 "
                                                >
                                                   {" "}
                                                   <BiChevronLeft
                                                      className={classNames(
                                                         "mr-1  duration-300 transform transition-all ease-in-out",
                                                         {
                                                            "-rotate-90":
                                                               actionActive ===
                                                               `ic-${ic}`,
                                                         }
                                                      )}
                                                   />{" "}
                                                </button>
                                                {ch.name}
                                             </div>
                                          );
                                       }
                                       return (
                                          <div
                                             className="col-span-3 "
                                             key={`ic-${ic}`}
                                          >
                                             <div
                                                className={classNames(
                                                   "px-2 py-1 ml-2 grid grid-cols-3 gap-2",
                                                   {
                                                      "bg-gray-100":
                                                         ic % 2 === 1,
                                                      "bg-white": ic % 2 === 0,
                                                      // "cursor-pointer hover:bg-gray-300":
                                                      //    !loading &&
                                                      //    (ch.actions || [])
                                                      //       .length > 0,
                                                   }
                                                )}
                                             >
                                                <dd className="text-sm font-medium text-gray-500">
                                                   {loading ? (
                                                      <LoadingSkeleton />
                                                   ) : (
                                                      submainName
                                                   )}
                                                </dd>
                                                <dd className="mt-1 text-sm text-gray-500 sm:mt-0">
                                                   {loading ? (
                                                      <LoadingSkeleton />
                                                   ) : (
                                                      ch.url
                                                   )}
                                                </dd>
                                                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 text-right">
                                                   {loading ? (
                                                      <LoadingSkeleton />
                                                   ) : (
                                                      <input
                                                         checked={
                                                            ch.access_role
                                                         }
                                                         onChange={(e)=>setMenuRole({
                                                            menu_id : ch.id,
                                                            role_id:props.role_id,
                                                            type:"MENU",
                                                            accessed: e.target.checked
                                                         })}
                                                         id="default-checkbox"
                                                         type="checkbox"
                                                         className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600"
                                                      />
                                                   )}
                                                </dd>
                                             </div>
                                             {!loading &&
                                                (ch.actions || []).length >
                                                   0 && (
                                                   // actionActive === `ic-${ic}` &&
                                                   <div
                                                      className={classNames(
                                                         "pl-3 ml-5 duration-300 transform transition-all ease-linear",
                                                         {
                                                            "h-0 p-0  overflow-hidden":
                                                               !(
                                                                  actionActive ===
                                                                  `ic-${ic}`
                                                               ),
                                                            "h-max mb-4 ":
                                                               actionActive ===
                                                               `ic-${ic}`,
                                                         }
                                                      )}
                                                   >
                                                      <span className="text-xs font-semibold">
                                                         Actions List :
                                                      </span>
                                                      {(ch.actions || []).map(
                                                         function (
                                                            actc: any,
                                                            iact: number
                                                         ) {
                                                            return (
                                                               <dl
                                                                  key={`iact-${iact}`}
                                                                  className={classNames(
                                                                     "grid grid-cols-3 text-xs p-1",
                                                                     {
                                                                        "bg-gray-100":
                                                                           iact %
                                                                              2 ===
                                                                           1,
                                                                        "bg-white":
                                                                           iact %
                                                                              2 ===
                                                                           0,
                                                                     }
                                                                  )}
                                                               >
                                                                  <dd className="px-1">
                                                                     {actc.name}
                                                                  </dd>
                                                                  <dd className="">
                                                                     {actc.type}
                                                                  </dd>
                                                                  <dd className=" max-sm:text-right">
                                                                     <input
                                                                        disabled={!ch.access_role}
                                                                        onChange={(e)=>setMenuRole({
                                                                           action_id : actc.id,
                                                                           role_id:props.role_id,
                                                                           type:"ACTION",
                                                                           accessed: e.target.checked
                                                                        })}
                                                                        checked={
                                                                           actc.access_role
                                                                        }
                                                                        id="default-checkbox"
                                                                        type="checkbox"
                                                                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600"
                                                                     />
                                                                  </dd>
                                                               </dl>
                                                            );
                                                         }
                                                      )}
                                                   </div>
                                                )}
                                          </div>
                                       );
                                    }
                                 )}
                           </div>
                           {!loading && (itm.actions || []).length > 0 && (
                              // actionActive === String(i) &&
                              <div
                                 className={classNames(
                                    "pl-3 ml-5 duration-300 transform transition-all ease-in-out",
                                    {
                                       "h-0 p-0 overflow-hidden": !(
                                          actionActive === String(i)
                                       ),
                                       "h-fit mb-4 ":
                                          actionActive === String(i),
                                    }
                                 )}
                              >
                                 <span className="text-xs font-semibold">
                                    Actions List :
                                 </span>
                                 {(itm.actions || []).map(function (
                                    act: any,
                                    x: number
                                 ) {
                                    return (
                                       <dl
                                          key={`act-${x}`}
                                          className={classNames(
                                             "grid grid-cols-3 text-xs p-1",
                                             {
                                                "bg-gray-100": x % 2 === 1,
                                                "bg-white": x % 2 === 0,
                                             }
                                          )}
                                       >
                                          <dd className="px-1">{act.name}</dd>
                                          <dd className="">{act.type}</dd>
                                          <dd className=" max-sm:text-right">
                                             <input
                                                disabled={!itm.access_role}
                                                onChange={(e)=>setMenuRole({
                                                   action_id : act.id,
                                                   role_id:props.role_id,
                                                   type:"ACTION",
                                                   accessed: e.target.checked
                                                })}
                                                checked={act.access_role}
                                                id="default-checkbox"
                                                type="checkbox"
                                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600"
                                             />
                                             {/* { JSON.stringify( act.access_role)} */}
                                          </dd>
                                       </dl>
                                    );
                                 })}
                              </div>
                           )}
                        </div>
                     );
                  })}
               </dl>
            </div>
            {/* </Form> */}
            <div className="p-2"></div>
         </Modal.Body>
         <Modal.Footer>
            <div className="flex justify-end items-end">
               <Button onClick={props.onClose} type="button" color="secondary">
                  Close
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
