import React from "react";
import { Loader } from '..'

type LoadingProps = {
   isLoading: boolean;

};
export default function (props: LoadingProps & React.PropsWithChildren): JSX.Element {
   // React.useEffect(
   //    function () {
   //       if (props.isLoading) {
   //          document.body.classList.add("overflow-hidden");
   //       } else {
   //          document.body.classList.remove("overflow-hidden");
   //       }
   //    },
   //    [props.isLoading]
   // );
   return (
      <dialog
         style={{ zIndex: 99999 }}
         className={`
            overflow-hidden
            fixed top-0 right-0 h-full w-full backdrop-blur-sm z-[80] bg-white/20
            justify-center items-center h-modal 
            duration-800 ease-in-out transform transition-all
      ${props.isLoading ? "flex" : "hidden"} 
   `}
      >
         <div className=" text-center items-center justify-center duration-800 transform transition-all">
            <Loader size={40} color="primary" />
            <h1 className="text-primary text-center mt-2 text-md font-semibold">{
               props.children
            }</h1>
         </div>
      </dialog>
   );
}
