import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contextMenuType, layoutStateType } from "../../@types/redux";
import { CgMoreVertical } from "react-icons/cg";
import {
   layoutActions,
   layoutSelector,
} from "../../redux/slices/layouts/layoutSlice";
import { useOutside } from "../../_modules/hooks/useOutside";
import style from './table.module.css'

export default function (): JSX.Element {
   const disp = useDispatch();
   const layutState: layoutStateType = useSelector(layoutSelector);
   return (
      <>
         <div className="relative overflow-x-auto overflow-y-auto max-h-[300px]">
            <table className={`${style.tableFixHead}  w-full text-xs text-left`}>
               <thead className="  text-xs text-gray-700 font-bold capitalize bg-gray-300 ">
                  <tr className="">
                     <th scope="col" className="py-3 px-2 bg-gray-300">
                        Product name
                     </th>
                     <th scope="col" className="py-3 px-2 bg-gray-300">
                        Color
                     </th>
                     <th scope="col" className="py-3 px-2 bg-gray-300">
                        Category
                     </th>
                     <th scope="col" className="py-3 px-2 bg-gray-300">
                        Price
                     </th>
                     {/* actions */}
                     <th scope="col" className="py-3 px-2 bg-gray-300">
                        &nbsp;
                     </th>
                  </tr>
               </thead>
               <tbody className="">
                  <tr
                     className="odd:bg-white shadow-xl border-b even:bg-gray-50 hover:bg-slate-200"
                     onContextMenu={(e) => {
                        let target = e.target as HTMLTableElement;
                        e.preventDefault();
                        disp(
                           layoutActions.setContextMenu({
                              indexSelected: null,
                              show: true,
                              x: e.pageX,
                              y: e.pageY,
                              listMenu: [],
                           })
                        );
                     }}
                  >
                     <td className="py-2 px-2">Apple MacBook Pro 17"</td>
                     <td className="py-2 px-2">Sliver</td>
                     <td className="py-2 px-2">Laptop</td>
                     <td className="py-2 px-2">$2999</td>
                     <td className="py-2 px-2 text-right">
                        <ActionMore
                           listMenu={[
                              {
                                 name: "Test 1",
                                 onClick() {
                                    console.log("clicked");
                                 },
                              },
                           ]}
                        />
                     </td>
                  </tr>
                  <tr className="odd:bg-white border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Microsoft Surface Pro</td>
                     <td className="py-2 px-2">White</td>
                     <td className="py-2 px-2">Laptop PC</td>
                     <td className="py-2 px-2">$1999</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
                  <tr className="odd:bg-white  border-b even:bg-gray-50  hover:bg-slate-200">
                     <td className="py-2 px-2">Magic Mouse 2</td>
                     <td className="py-2 px-2">Black</td>
                     <td className="py-2 px-2">Accessories</td>
                     <td className="py-2 px-2">$99</td>
                     <td className="py-2 px-2 text-right">
                        <button className="float-right">
                           <CgMoreVertical />
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </>
   );
}

function ActionMore(props: { listMenu: Array<contextMenuType> }): JSX.Element {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   // const [triggerRef, setTriggerRef] = useState<any>(null);
   // const [boxRef, setBoxRef] = useState<any>(null);
   // useOutside(boxRef, triggerRef, () => setIsOpen(false));
   const reffDrop = useRef<HTMLDivElement>(null)
   const onclickAnother = function (e : MouseEvent) {
      if (reffDrop.current && !reffDrop.current?.contains((e.target as HTMLElement))) {
         setIsOpen(false)
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
