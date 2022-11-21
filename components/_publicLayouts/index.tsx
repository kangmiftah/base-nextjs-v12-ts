import React, { FC } from "react";
import Nav from "./nav/nav";

export default function Layout<FC>(page: React.ReactElement) {
   return (
      <>
         <div className=" min-h-full max-h-full w-height overflow-hidden">
            <div className=" overflow-auto max-h-full ">
               <Nav />
               <div className="container mx-auto px-4 py-4 h-[calc(100vh*2)]">
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
