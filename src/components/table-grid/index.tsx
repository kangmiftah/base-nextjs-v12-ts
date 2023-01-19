import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { layoutStateType } from "../../@types/redux";
import { CgMoreVertical } from "react-icons/cg";
import {
   layoutActions,
   layoutSelector,
} from "../../redux/slices/layouts/layoutSlice";
import { useOutside } from "../../_modules/hooks/useOutside";
import style from "./table.module.css";
import { actionType, TableGridProps } from "../../@types/components/table-grid";
import { Pagination } from "..";
import { PaginationPropsType } from "../../@types/components/pagination";
import Button from "../button";
import { FiChevronLeft } from "react-icons/fi";

function getSize(size: number | string | undefined): string {
   if (size === undefined) return "fit-content";
   if (typeof size === "number") return `${size}px`;
   if (typeof size === "string") return size;
   else return "fit-content";
}

function getMaxHeight(height: number | string | undefined): string {
   if (height === undefined) return "max-h-[600px]";
   if (typeof height === "number") return `max-h-[${height}px]`;
   if (typeof height === "string") return `max-h-[${height}]`;
   else return "max-h-[600px]";
}

function getMinHeight(height: number | string | undefined): string {
   if (height === undefined) return "min-h-[300px]";
   if (typeof height === "number") return `min-h-[${height}px]`;
   if (typeof height === "string") return `min-h-[${height}]`;
   else return "min-h-[300px]";
}

function LoadingSkeleton(): JSX.Element {
   return (
      <div className="h-[25px] animate-pulse">
         <div className="h-full bg-[#D9D9D9] rounded-md">
            <div className="h-full bg-[#969696] rounded-md"></div>
         </div>
      </div>
   );
}
export default function (
   props: TableGridProps & PaginationPropsType
): JSX.Element {
   const disp = useDispatch();
   const layutState: layoutStateType = useSelector(layoutSelector);
   let loadingArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   const [childActive, setChildActive] = useState<number | undefined>(
      undefined
   );
   let renderChild = props.renderChild;
   if (!renderChild) renderChild = (item: any) => <></>;
   return (
      <>
         <div
            className={`relative overflow-x-auto overflow-y-auto ${getMinHeight(
               props.minHeight
            )} ${getMaxHeight(props.maxHeight)}`}
         >
            <table
               className={`${style.tableFixHead}  w-full text-xs text-left`}
            >
               <thead className="  text-xs text-gray-700 font-bold capitalize bg-gray-300 ">
                  <tr className="">
                     {props.withChild && (
                        <th scope="col" className=" bg-gray-300  max-w-[10px]">
                           &nbsp;
                        </th>
                     )}
                     {props.iterationNumber && (
                        <th
                           scope="col"
                           className={classNames(
                              " bg-gray-300 min-w-fit  px-2",
                              {
                                 "py-3": props.headerSize !== "small",
                              }
                           )}
                        >
                           #
                        </th>
                     )}
                     {props.columns.map(
                        ({ onRender, title, className, style, width }, i) => {
                           return (
                              <th
                                 key={`col-${i}`}
                                 scope="col"
                                 style={{
                                    ...{ minWidth: getSize(width) },
                                    ...style,
                                 }}
                                 className={classNames(
                                    `bg-gray-300  px-2 ${className}`,
                                    {
                                       "py-3": props.headerSize !== "small",
                                    }
                                 )}
                              >
                                 {title}
                              </th>
                           );
                        }
                     )}
                     {/* actions */}
                     {props.withAction &&
                        (props.actionsMenu || [])?.length > 0 &&
                        !props.isLoading &&
                        (props.actionMenuType || "DROPDOWN") === "DROPDOWN" && (
                           <th
                              scope="col"
                              className={classNames(" px-2 bg-gray-300", {
                                 "py-3": props.headerSize !== "small",
                              })}
                           >
                              &nbsp;
                           </th>
                        )}
                  </tr>
               </thead>
               <tbody className="duration-300 ease-in-out transition-all transform">
                  {!props.isLoading && props.data.length <= 0 ? (
                     <tr>
                        <td
                           className="odd:bg-white border-b even:bg-gray-50 hover:bg-slate-200 pl-5"
                           colSpan={
                              props.columns.length +
                              1 +
                              (props.iterationNumber ? 1 : 0) +
                              (props.actionMenuType === "DROPDOWN" &&
                              props.withAction
                                 ? 1
                                 : 0)
                           }
                        >
                           No Data Records...
                        </td>
                     </tr>
                  ) : (
                     (props.isLoading ? loadingArray : props.data).map(
                        (item, l) => (
                           <>
                              <tr
                                 key={`d-${l}`}
                                 className="odd:bg-white border-b even:bg-gray-50 hover:bg-slate-200"
                                 onContextMenu={(e) => {
                                    if (
                                       (props.actionMenuType || "DROPDOWN") ===
                                          "CONTEXTMENU" &&
                                       !props.isLoading
                                    ) {
                                       e.preventDefault();
                                       disp(
                                          layoutActions.setContextMenu({
                                             indexSelected: null,
                                             show: true,
                                             x: e.pageX,
                                             y: e.pageY,
                                             listMenu: (props.actionsMenu || [])
                                                .filter(
                                                   ({
                                                      onRender = () => true,
                                                   }) => onRender(item)
                                                )
                                                .map(
                                                   (
                                                      { name, onClick, style },
                                                      iM
                                                   ) => ({
                                                      name,
                                                      onClick: () =>
                                                         onClick(
                                                            item,
                                                            { name, onClick },
                                                            iM
                                                         ),
                                                      style,
                                                   })
                                                ),
                                          })
                                       );
                                    }
                                 }}
                              >
                                 {props.withChild && (
                                    <td className="py-1 px-1 text-left max-w-[10px] ">
                                       <button
                                          onClick={() => {
                                             setChildActive((v) =>
                                                v === l ? undefined : l
                                             );
                                             props.onOpenChild?.(item);
                                          }}
                                          type="button"
                                          className={classNames(
                                             " mt-1  duration-300 ease-in-out transition-all transform",
                                             {
                                                "-rotate-90": l === childActive,
                                             }
                                          )}
                                          color="secondary"
                                       >
                                          <FiChevronLeft />
                                       </button>
                                    </td>
                                 )}
                                 {props.iterationNumber && (
                                    <td
                                       scope="col"
                                       className="py-1 px-2 min-w-fit"
                                    >
                                       {props.isLoading ? (
                                          <LoadingSkeleton />
                                       ) : (
                                          (props.currentShow || 10) *
                                             ((props?.currentPage || 1) - 1) +
                                          (l + 1)
                                       )}
                                    </td>
                                 )}
                                 {props.columns.map(
                                    (
                                       {
                                          onRender,
                                          className,
                                          style,
                                          width,
                                          field,
                                       },
                                       ix
                                    ) => (
                                       <td
                                          key={`col-x-${ix}`}
                                          className={`py-1 px-2 min-h-fit ${className}`}
                                          style={{
                                             ...{ minWidth: getSize(width) },
                                             ...style,
                                          }}
                                       >
                                          {props.isLoading ? (
                                             <LoadingSkeleton />
                                          ) : onRender ? (
                                             onRender(item)
                                          ) : (
                                             item[field as keyof typeof item]
                                          )}
                                       </td>
                                    )
                                 )}
                                 {props.withAction &&
                                    (props.actionsMenu || [])?.length > 0 &&
                                    !props.isLoading &&
                                    (props.actionMenuType || "DROPDOWN") ===
                                       "DROPDOWN" && (
                                       <td className="py-1 px-2 text-right">
                                          {props.isLoading ? (
                                             <LoadingSkeleton />
                                          ) : (
                                             <ActionMore
                                                listMenu={(
                                                   props.actionsMenu || []
                                                )
                                                   .filter(
                                                      ({
                                                         onRender = () => true,
                                                      }) => onRender(item)
                                                   )
                                                   .map(
                                                      (
                                                         {
                                                            name,
                                                            onClick,
                                                            onRender = () =>
                                                               true,
                                                            style,
                                                            className,
                                                         },
                                                         iM
                                                      ) => ({
                                                         name,
                                                         onClick: () =>
                                                            onClick(
                                                               item,
                                                               {
                                                                  name,
                                                                  onClick,
                                                               },
                                                               iM
                                                            ),
                                                         onRender,
                                                         className,
                                                         style,
                                                      })
                                                   )}
                                             />
                                          )}
                                       </td>
                                    )}
                              </tr>
                              {props.withChild && l === childActive && (
                                 <tr>
                                    <td
                                       colSpan={
                                          props.columns.length +
                                          1 +
                                          (props.iterationNumber ? 1 : 0) +
                                          (props.actionMenuType ===
                                             "DROPDOWN" && props.withAction
                                             ? 1
                                             : 0)
                                       }
                                    >
                                       <div className="min-h-[50px] w-full">
                                          {props.loadingChild ? (
                                             <LoadingSkeleton />
                                          ) : (
                                             childActive === l &&
                                             renderChild?.(item)
                                          )}
                                       </div>
                                    </td>
                                 </tr>
                              )}
                           </>
                        )
                     )
                  )}
               </tbody>
            </table>
         </div>
         <div className="mt-5">
            {props.pagination && (
               <Pagination
                  onChangePage={props.onChangePage}
                  onChangeShow={props.onChangeShow}
                  currentPage={props.currentPage}
                  currentShow={props.currentShow}
                  dataLength={props.data.length}
                  showList={props.showList}
               />
            )}
         </div>
      </>
   );
}

function ActionMore(props: { listMenu: Array<actionType> }): JSX.Element {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   // const [triggerRef, setTriggerRef] = useState<any>(null);
   // const [boxRef, setBoxRef] = useState<any>(null);
   // useOutside(boxRef, triggerRef, () => setIsOpen(false));
   const reffDrop = useRef<HTMLDivElement>(null);
   const onclickAnother = function (e: MouseEvent) {
      if (
         reffDrop.current &&
         !reffDrop.current?.contains(e.target as HTMLElement)
      ) {
         setIsOpen(false);
      }
   };
   useEffect(() => {
      document.addEventListener("mouseup", onclickAnother);
      return () => {
         document.removeEventListener("mouseup", onclickAnother);
      };
   }, []);

   return (
      <div ref={reffDrop} className="w-full z-[999]">
         <button onClick={() => setIsOpen((v) => !v)} className="float-right">
            <CgMoreVertical />
         </button>
         <div
            className={` ${classNames({
               hidden: !isOpen,
            })} absolute min-w-[150px] z-[999] duration-300 bg-slate-50 right-5 transition-all 
            ease-in-out overflow-hidden
            shadow-md `}
         >
            <ul className="w-full">
               {(props.listMenu || []).map((menu, i) => (
                  <li
                     key={`drp-${i}`}
                     className="hover:bg-primary-400 hover:text-white border-b"
                  >
                     <button
                        className={`block text-left w-full px-2 py-1 text-xs ${menu.className}`}
                        style={menu.style}
                        onClick={() => {
                           setIsOpen(false);
                           menu.onClick();
                        }}
                     >
                        {menu.name}{" "}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}
