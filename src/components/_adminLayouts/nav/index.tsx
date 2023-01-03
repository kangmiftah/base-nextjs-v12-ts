import {useCallback,useState, useEffect, useRef } from "react";
// import { layoutActions } from '../../slices/layouts/layoutSlice';
import type { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { layoutStateType } from "../../../@types/redux/slices/layouts/layoutSlice";
import { layoutActions } from "../../../redux/slices/layouts/layoutSlice";
import classNames from "classnames";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { useOutside } from "../../../_modules/hooks/useOutside";

export default function Navbar<FC>(props: any) {
   const { data, status } = useSession();
   const layoutState: layoutStateType = useSelector(
      (state: RootState) => state.layout
   );
   const dispatch = useDispatch();
   let cn = classNames({
      "md:ml-[250px]": layoutState.sidebarOpen,
      "md:w-[calc(100%_-_250px)]": layoutState.sidebarOpen,
      "md:w-full": !layoutState.sidebarOpen,
      "md:ml-[0px]": !layoutState.sidebarOpen,
      "ml-[250px]": !layoutState.sidebarOpen,
      "w-[calc(100%_-_250px)]": !layoutState.sidebarOpen,
      "ml-0": layoutState.sidebarOpen,
      "w-full": layoutState.sidebarOpen,
   });
   return (
      <div
         className={`fixed bg-navbar z-10 top-0 ${cn}  bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.3)] h-[50px]  ease-in-out duration-300`}
      >
         <div className="flex justify-between items-center md:space-x-10">
            <div className="flex justify-start mr-2 my-1 align-middle">
               <button
                  id="sidebar"
                  onClick={() => {
                     dispatch(layoutActions.toggleSidebar());
                  }}
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
               >
                  <span id="sidebar" className="sr-only">
                     Open menu
                  </span>

                  <svg
                     id="sidebar"
                     className="h-6 w-6"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="2"
                     stroke="currentColor"
                     aria-hidden="true"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                     />
                  </svg>
               </button>
            </div>
            <div
               className={`flex justify-end mr-2 my-1 items-center align-middle px-3
               ${classNames({
                  "max-md:hidden": !layoutState.sidebarOpen,
               })}
            `}
            >
               <DropdownUser />
            </div>
         </div>
      </div>
   );
}

function DropdownUser() {
   const { data, status } = useSession();
   const disp = useDispatch()
   const router = useRouter();
   let session: any = data;
   const [open, setOpen] = useState<boolean>(false);
   function logOut(){
      disp(layoutActions.setLoading({
         isLoading: true,
         loadingText:"Signing Out. Please wait ..."
      }))
      setTimeout(async function(){
         await signOut({redirect:false})
         disp(layoutActions.setLoading({
            isLoading: true,
            loadingText:"Clearing session. Please wait ..."
         }))
         setTimeout(function(){
            router.reload();
            disp(layoutActions.setLoading({
               isLoading: false,
               loadingText:""
            }))
         }, 500)
      }, 1000)

   }
   const close = useCallback(()=>setOpen(false) ,[setOpen]) 
   const reffDrop = useRef<HTMLDivElement>(null);
   const onclickAnother = function (e: MouseEvent) {
      if (
         reffDrop.current &&
         !reffDrop.current?.contains(e.target as HTMLElement)
      ) {
         close();
      }
   };
   useEffect(() => {
      document.addEventListener("mouseup", onclickAnother);
      return () => {
         document.removeEventListener("mouseup", onclickAnother);
      };
   }, []);
   return (
      <div ref={reffDrop}>
         <button
            onClick={() => setOpen((v) => !v)}
            id="sidebar"
            type="button"
            className="
               bg-white rounded-md p-2 inline-flex 
               items-center justify-center text-gray-400 
               hover:text-gray-500 hover:bg-gray-100 
               focus:outline-none focus:ring-2 focus:ring-inset
            "
            aria-expanded="false"
         >
            <Image
               className="w-7 h-7 rounded-full mr-2"
               width={200}
               height={200}
               src="/image/dummyimage.png"
               alt="foto profile"
            />
            {data?.user?.name}
         </button>
         <div
            id="dropdownNavbar"
            className={`z-10 ${classNames({ hidden: !open })} 
            duration-800 ease-in-out transform transition-all
            absolute top-14 font-normal bg-white divide-y divide-gray-100 rounded-md shadow-md w-64 right-1 py-1 px-2`} //dark:bg-gray-700 dark:divide-gray-600
         >
            <div className=" items-center inline-flex justify-center">
               <div className="mt-2">
                  <Image
                     className=" w-14 h-14 rounded-full mr-2"
                     width={200}
                     height={200}
                     src="/image/dummyimage.png"
                     alt="profile"
                  />
               </div>
               <div>
                  <h1 className="text-md font-bold">{data?.user?.name} </h1>
                  <h4 className="text-[7pt]">{session?.user?.email} </h4>
               </div>
            </div>
            <div>
               <ul
                  className="py-1 text-sm text-gray-700 space-y-1 "
                  aria-labelledby="dropdownLargeButton"
               >
                  <li>
                     <a className="block px-4 py-2 hover:bg-gray-100" href="#">TEST</a>
                  </li>
                  <li className="border-top-[1px] border-gray-500 border-solid">
                     <button
                        onClick={() => logOut()}
                        className="inline-flex items-center justify-center px-4 py-2 hover:bg-gray-100 w-full text-danger text-left"
                     >
                        <FiLogOut /> <span className="ml-1"> Sign Out </span>
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}
