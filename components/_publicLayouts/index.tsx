import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { layoutStateType } from "../../@types/redux";
import { layoutSelector } from "../../redux/slices/layouts/layoutSlice";
import Nav from "./nav/nav";

export default function Layout<FC>(page: React.ReactElement) {
   const [showNav, setShowNav] = useState<boolean>(false);
   const layouState : layoutStateType = useSelector(layoutSelector)
   useEffect(() => {
      setShowNav(true);
    }, []);

   return (
      <>
         <div className=" min-h-full max-h-full w-height overflow-hidden">
            <div className=" overflow-auto max-h-full ">
               { showNav &&  <Nav />}
               <div className={`container mx-auto px-4 py-4 h-[calc(100vh*2)] ${layouState.isSticky ? "mt-[150px]" : ""}`}>
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
