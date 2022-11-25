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
         <div className=" min-h-full w-height">
            <div className="  h-full ">
               { showNav &&  <Nav />}
               <div className={`container mx-auto px-4 py-4 min-h-screen ${layouState.isSticky ? "mt-[100px]" : ""}`}>
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
