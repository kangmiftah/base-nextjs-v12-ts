import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { layoutStateType } from "../../@types/redux";
import { layoutActions, layoutSelector } from "../../redux/slices/layouts/layoutSlice";
import Nav from "./nav/nav";
import { LoadingPage } from "..";
import { useDispatch } from "react-redux";

export default function Layout<FC>(page: React.ReactElement) {
   const [showNav, setShowNav] = useState<boolean>(false);
   const layouState: layoutStateType = useSelector(layoutSelector);
   const disp = useDispatch();
   useEffect(() => {
      setShowNav(true);
   }, []);
   const xRef = React.useRef<HTMLDivElement>(null);

   function handleScroll(e: React.SyntheticEvent) {
      let html = e.target as HTMLElement;
      let nav: HTMLElement | null =
         document.getElementById("nav-header");
      if (html.scrollTop > ( 0))
         disp(layoutActions.setNavSticky(true));
      else disp(layoutActions.setNavSticky(false));
   }

   return (
      <>
         <div
            className=" min-h-full w-height max-h-screen overflow-y-auto"
            onScroll={handleScroll}
         >
            <div ref={xRef} className="  h-full ">
               {showNav && <Nav />}
               <div
                  className={`container mx-auto py-4 min-h-screen ${
                     layouState.isSticky ? "mt-[100px]" : ""
                  }`}
               >
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
