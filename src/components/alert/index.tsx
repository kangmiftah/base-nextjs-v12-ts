import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
   AlertComponentTypes,
} from "../../@types/components/alert";
import { layoutStateType } from "../../@types/redux";
import {
   layoutActions,
   layoutSelector,
} from "../../redux/slices/layouts/layoutSlice";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { GrCircleAlert } from "react-icons/gr";
import { Modal, Button } from "..";

export default (): JSX.Element => {
   let { alertList = [], }: layoutStateType =
      useSelector(layoutSelector);

   return (
      <>
         <div className="fixed z-[999999999999] ml-5 right-5 top-16 transition-all ease-linear transform duration-300">
            {alertList.map((item, i) => (
               <AlertComponent key={i} {...item} />
            ))}
         </div>
      </>
   );
};

function AlertComponent(
   props: AlertComponentTypes & { unique: number }
): JSX.Element {
   const [loading, setLoading] = useState<number>(100);
   const [hide, setHide] = useState<boolean>(true);
   const [onMouse, setOnmouse] = useState<boolean>(false)
   let disp = useDispatch();

   function close() {
      props.callback?.();
      disp(layoutActions.closeAlert(props.unique));
   }
   useEffect(function(){

      setTimeout(() => setHide(false), 300);
   },[])

   useEffect(function(){
      if(loading <= 0 ) {
         close()
      }
   }, [loading])
   useEffect(function () {
      const interVal = setInterval(() => {
       
         setLoading((v) => v - 100 / 30)
      }, 100);
      if(onMouse) clearInterval(interVal)
      return () => {
         clearInterval(interVal);
      };
   }, [onMouse]);

   function Icon(): JSX.Element {
      switch (props.type) {
         case "Error":
            return <BsXCircle className="mr-3 text-2xl" width={460} />;
         case "Info":
            return <GrCircleAlert className="mr-3 text-2xl" width={60} />;
         case "Success":
            return <BsCheckCircle className="mr-3 text-2xl" width={60} />;
         case "Warning":
            return <FiAlertTriangle className="mr-3 text-2xl" width={60} />;
      }
   }
   return (
      <div
         onMouseEnter={()=> setOnmouse(true)}
         onMouseLeave={()=> setOnmouse(false)}
         className={classNames(
            `mb-2  border-t-4   rounded-b  px-0 py-0 shadow-md transition-all ease-in-out transform  duration-300`,
            {
               hidden: hide,
               
               "bg-opacity-60": !onMouse,
               "bg-success-200": props.type === "Success",
               "border-success-500": props.type === "Success",
               "text-success-700": props.type === "Success",

               "bg-danger-200": props.type === "Error",
               "border-danger-500": props.type === "Error",
               "text-danger-700": props.type === "Error",

               "bg-info-200": props.type === "Info",
               "border-info-500": props.type === "Info",
               "text-info-700": props.type === "Info",

               "bg-warning-200": props.type === "Warning",
               "border-warning-500": props.type === "Warning",
               "text-warning-700": props.type === "Warning",
            }
         )}
         role="alert"
      >
         <div className="py-3 px-3">
            <button className="float-right" onClick={() => close()}>
               X
            </button>
            <div className="flex">
               <div className="py-1">
                  <Icon />
                  {/* <svg
                     className={classNames(`fill-current h-6 w- mr-4`, {
                        "text-success-500" : props.type ==="Success",
                        "text-info-500" : props.type ==="Info",
                        "text-danger-500" : props.type ==="Error",
                        "text-warning-500" : props.type ==="Warning",
                     })}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                  >
                     <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg> */}
               </div>
               <div className="mr-5">
                  <p className="font-bold">{props.title}</p>
                  <p className="text-sm">{props.message}</p>
               </div>
            </div>
         </div>
         <div
            style={{
               width: `${loading}%`,
            }}
            className={classNames(
               `flex-1 h-1 mt-3 mb-0 mx-0 transition-all ease-linear transform`,
               {
                  "bg-success-400": props.type === "Success",
                  "bg-info-400": props.type === "Info",
                  "bg-danger-400": props.type === "Error",
                  "bg-warning-400": props.type === "Warning",
               }
            )}
         ></div>
      </div>
   );
}

