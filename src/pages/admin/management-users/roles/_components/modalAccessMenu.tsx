import { Button, Form, Modal, Input } from "../../../../../components";
import { BiSearchAlt, BiChevronLeft } from "react-icons/bi";
import { useGetAccessMenuMutation } from "../../../../../redux/services/admin/users-management/rolesPage";
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
   const [search, setSearch] = React.useState<string>("")
   const [loading, setLoading] = React.useState<boolean>(false);
   const [dataAccess, setDataAccess] = React.useState<Array<any>>([]);
   const getData = async () => {
      setLoading(true);
      try {
         let { data }: any = await getAccessMenu({ role_id : props.role_id, search});
         console.log(data);
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
         if (props.show) getData();
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
        !props.show && setSearch("")
      },
      [props.show]
   );
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
                     onKeyUp={(e)=> e.keyCode === 13 && getData()}
                     className="mr-2"
                     sizeinput="sm"
                     value={search}
                     onChange={(e : React.SyntheticEvent) =>{
                        let target = e.target as HTMLInputElement
                        setSearch(target.value)
                     }}
                  />
                  <Button type="button" onClick={() => getData()} size={"sm"} className="">
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
                        return (
                           <div key={i}>
                              <div
                                 className={classNames(
                                    "pr-2 py-2 pl-5 grid grid-cols-3 sm:gap-4",
                                    {
                                       "bg-gray-100": i % 2 === 1,
                                       "bg-white": i % 2 === 0,
                                       "cursor-pointer hover:bg-gray-300":
                                          !loading &&
                                          (itm.actions || []).length > 0,
                                    }
                                 )}
                                 onClick={() =>
                                    !loading &&
                                    (itm.actions || []).length > 0 &&
                                    changeActiveAction(String(i))
                                 }
                              >
                                 <dd className="text-sm font-medium text-gray-900">
                                    {loading ? <LoadingSkeleton /> : itm.name}
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
                                          return (
                                             <div
                                                className="col-span-3 "
                                                key={`ic-${ic}`}
                                             >
                                                <div
                                                   onClick={() =>
                                                      !loading &&
                                                      (ch.actions || [])
                                                         .length > 0 &&
                                                      changeActiveAction(
                                                         `ic-${ic}`
                                                      )
                                                   }
                                                   className={classNames(
                                                      "px-2 py-1 ml-2 grid grid-cols-3 gap-2",
                                                      {
                                                         "bg-gray-100":
                                                            ic % 2 === 1,
                                                         "bg-white":
                                                            ic % 2 === 0,
                                                         "cursor-pointer hover:bg-gray-300":
                                                            !loading &&
                                                            (ch.actions || [])
                                                               .length > 0,
                                                      }
                                                   )}
                                                >
                                                   <dd className="text-sm font-medium text-gray-500">
                                                      {loading ? (
                                                         <LoadingSkeleton />
                                                      ) : (
                                                        ( ch.name)
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
                                                            id="default-checkbox"
                                                            type="checkbox"
                                                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600"
                                                         />
                                                      )}
                                                   </dd>
                                                </div>
                                                {!loading &&
                                                   (ch.actions || []).length >
                                                      0 &&
                                                   actionActive ===
                                                      `ic-${ic}` && (
                                                      <div className="pl-3 ml-5">
                                                         <span className="text-xs font-semibold">
                                                            Actions List :
                                                         </span>
                                                         {(
                                                            ch.actions || []
                                                         ).map(function (
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
                                                         })}
                                                      </div>
                                                   )}
                                             </div>
                                          );
                                       }
                                    )}
                              </div>
                              {!loading &&
                                 (itm.actions || []).length > 0 &&
                                 actionActive === String(i) && (
                                    <div className="pl-3 ml-5 mb-4">
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
                                                      "bg-gray-100":
                                                         x % 2 === 1,
                                                      "bg-white": x % 2 === 0,
                                                   }
                                                )}
                                             >
                                                <dd className="px-1">
                                                   {act.name}
                                                </dd>
                                                <dd className="">{act.type}</dd>
                                                <dd className=" max-sm:text-right">
                                                   <input
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
