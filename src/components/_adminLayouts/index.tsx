import classNames from "classnames";
import Link from "next/link";
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
                    pt-3 px-5 inline-block overflow-x-hidden overflow-y-auto`}
               >
                  <nav className="block mb-4" aria-label="Breadcrumb">
                     <ol className="inline-flex items-center space-x-1 md:space-x-3 float-right">
                        <li className="inline-flex items-center">
                           <Link
                              href={(layoutState.breadcrumbs?.filter( v => v.name !== "Dashboard") || [])?.length > 0 ? "/" : "#"}
                              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                           >
                              <svg
                                 className="w-4 h-4 mr-2"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                              </svg>
                              Dashboard
                           </Link>
                        </li>
                        {
                           layoutState.breadcrumbs?.filter( v => v.name !== "Dashboard").map((m, k)=> (
                           <li key={k}>
                              <div className="flex items-center">
                                 <span className="text-gray-400">/</span>
                                 <Link
                                    href={m.isActive ?"#" : m.url}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                 >
                                    {m.name}
                                 </Link>
                              </div>
                           </li>
                           ))
                        }
                     </ol>
                  </nav>
                  {page}
               </div>
            </div>
         </div>
      </>
   );
}
