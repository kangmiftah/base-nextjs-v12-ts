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
import { Pagination } from '..'
import { PaginationPropsType } from "../../@types/components/pagination";

function getSize(size: number | string | undefined): string {
   if (size === undefined) return "fit-content";
   if (typeof size === "number") return `${size}px`;
   if (typeof size === "string") return size;
   else return "fit-content";
}
export default function (props: TableGridProps & PaginationPropsType): JSX.Element {
   const disp = useDispatch();
   const layutState: layoutStateType = useSelector(layoutSelector);
   return (
      <>
         <div className="relative overflow-x-auto overflow-y-auto min-h-[300px] max-h-[600px]">
            <table
               className={`${style.tableFixHead}  w-full text-xs text-left`}
            >
               <thead className="  text-xs text-gray-700 font-bold capitalize bg-gray-300 ">
                  <tr className="">
                     {props.iterationNumber && (
                        <th
                           scope="col"
                           className="py-3 px-2 bg-gray-300 min-w-fit"
                        >
                           #
                        </th>
                     )}
                     {props.columns.map(
                        ({ onRender, title, className, style, width }, i) => (
                           <th
                              key={i}
                              scope="col"
                              style={{
                                 ...{ minWidth: getSize(width) },
                                 ...style,
                              }}
                              className={`py-3 px-2 bg-gray-300 ${className}`}
                           >
                              {title}
                           </th>
                        )
                     )}
                     {/* actions */}
                     {props.withAction &&
                        (props.actionMenuType || "DROPDOWN") === "DROPDOWN" && (
                           <th scope="col" className="py-3 px-2 bg-gray-300">
                              &nbsp;
                           </th>
                        )}
                  </tr>
               </thead>
               <tbody className="">
                  {props.data.map((item, l) => (
                     <tr
                        key={l}
                        className="odd:bg-white border-b even:bg-gray-50 hover:bg-slate-200"
                        onContextMenu={(e) => {
                           if (
                              (props.actionMenuType || "DROPDOWN") ===
                              "CONTEXTMENU"
                           ) {
                              e.preventDefault();
                              disp(
                                 layoutActions.setContextMenu({
                                    indexSelected: null,
                                    show: true,
                                    x: e.pageX,
                                    y: e.pageY,
                                    listMenu: (props.actionsMenu || [])
                                       .filter(({ onRender = () => true }) =>
                                          onRender(item)
                                       )
                                       .map(
                                          (
                                             {
                                                name,
                                                onClick,
                                                style,
                                             },
                                             iM
                                          ) => ({
                                             name,
                                             onClick: ()=> onClick(
                                                item,
                                                { name, onClick },
                                                iM
                                             ),
                                             style
                                          })
                                       ),
                                 })
                              );
                           }
                        }}
                     >
                        {props.iterationNumber && (
                           <th
                              scope="col"
                              className="py-3 px-2 bg-gray-300 min-w-fit"
                           >
                              {l + 1}
                           </th>
                        )}
                        {props.columns.map(
                           (
                              { onRender, className, style, width, field },
                              i
                           ) => (
                              <td key={i} className={`py-2 px-2 min-h-max ${className}`}
                                 style={{
                                    ...{ minWidth: getSize(width) },
                                    ...style,
                                 }}
                              >
                                 {  onRender? onRender(item) : item[field as keyof typeof item]}
                              </td>
                           )
                        )}
                        {props.withAction &&
                           (props.actionMenuType || "DROPDOWN") ===
                              "DROPDOWN" && (
                              <td className="py-2 px-2 text-right">
                                 <ActionMore
                                    listMenu={(props.actionsMenu || [])
                                       .filter(({ onRender = () => true }) =>
                                          onRender(item)
                                       )
                                       .map(
                                          (
                                             {
                                                name,
                                                onClick,
                                                onRender = () => true,
                                                style
                                             },
                                             iM
                                          ) => ({
                                             name,
                                             onClick: ()=> onClick(
                                                item,
                                                { name, onClick },
                                                iM
                                             ),
                                             onRender,
                                             style
                                          })
                                       )}
                                 />
                              </td>
                           )}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-5">
            { true && <Pagination
               onChangePage={props.onChangePage}
               onChangeShow={props.onChangeShow}
               currentPage={props.currentPage}
               currentShow={props.currentShow}
               dataLength={props.data.length}
               showList={props.showList}
            />}
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
                     key={i}
                     className="hover:bg-primary-400 hover:text-white border-b"
                  >
                     <button
                        className="block text-left w-full px-2 py-1 text-xs"
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
