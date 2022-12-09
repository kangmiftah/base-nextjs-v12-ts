import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { layoutStateType } from "../../../@types/redux/slices/layouts/layoutSlice";
import { layoutActions } from "../../../redux/slices/layouts/layoutSlice";
import { RootState } from "../../../redux/store";

export default function Sidebar<FC>() {
   const layoutState: layoutStateType = useSelector(
      (state: RootState) => state.layout
   );
   const disp = useDispatch();
   const [hidingMobile, setHidingMobile] = useState<boolean>(false)
   useEffect(function () {
    let a: any;
      if(layoutState.sidebarOpen){
        a = setTimeout(()=> setHidingMobile(true), 500)
      }else setHidingMobile(false);
      return () => clearTimeout(a)
   }, [layoutState.sidebarOpen]);
   // ${ layoutState.sidebarOpen ? "-translate-x-full" : "translate-x-full" }
   let cn = classNames({
      "md:translate-x-0": layoutState.sidebarOpen,
      "md:-translate-x-full": !layoutState.sidebarOpen,
      "translate-x-0": !layoutState.sidebarOpen,
      "-translate-x-full": layoutState.sidebarOpen,
      "max-md:z-50": !hidingMobile,
   });
   return (
      <div
         id="sidebar"
         className={`fixed shadow-md ${cn}  bg-sidebar top-0 w-[250px] h-screen py-1 px-3 overflow-y-auto border-r ease-in-out duration-300`}
      >
         <div
            id="sidebar"
            className=" text-center font-mono border-b-2 pb-3 mb-1"
         >
            <h1 id="sidebar" className="text-2xl font-semibold text-white">
               E-Admin
            </h1>
         </div>
      </div>
   );
}
