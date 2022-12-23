import classNames from "classnames";
import React, {
   FC,
   useEffect,
   useLayoutEffect,
   useReducer,
   useRef,
   useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { layoutStateType } from "../../@types/redux";
import {
   layoutActions,
   layoutSelector,
} from "../../redux/slices/layouts/layoutSlice";
import LoadingPage from "../loadingPage";
import Navbar from "./nav";
import Sidebar from "./side";
export default function Layout<FC>(page: React.ReactElement) {
   const layoutState: layoutStateType = useSelector(layoutSelector);
   const dispatch = useDispatch();
   const [screenSize, setScreensize] = useState<{
      width: number;
      height: number;
   }>({ width: 0, height: 0 });
   const ref = useRef<HTMLDivElement>(null);
   useEffect(function () {
      function getSize() {
         const { innerWidth: width, innerHeight: height } = window;
         dispatch(layoutActions.setSizeScreen({ height, width }));
      }
      getSize();
      window.addEventListener("resize", getSize);
      return () => window.removeEventListener("resize", getSize);
   }, []);

   let cn = classNames({
      "md:ml-[250px]": layoutState.sidebarOpen,
      "md:ml-[0px]": !layoutState.sidebarOpen,
      "max-md:blur-sm": !layoutState.sidebarOpen,
   });

   return (
      <>
         <div
            ref={ref}
            className="relative min-h-full max-h-full w-height overflow-hidden"
         >
            <Navbar />
            <Sidebar />
            <div
               onClick={() =>
                  (layoutState.screenSize?.width || 0) < 768 &&
                  dispatch(layoutActions.closeSidebar())
               }
               className={`
                    ${cn}
                    bg-[#f4f6f9] 
                    relative 
                    ease-in-out duration-300
                    mt-[50px]
                    overflow-y-auto
                    overflow-x-hidden
                    height-root-content
                `}
            >
               <div
                  className={` w-full border-solid
                    pt-10 px-5 inline-block overflow-x-hidden overflow-y-auto`}
               >
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
