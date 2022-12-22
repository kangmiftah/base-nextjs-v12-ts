import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layoutStateType } from "../../../@types/redux";
import {
   layoutActions,
   layoutSelector,
} from "../../../redux/slices/layouts/layoutSlice";
import ModalLogin from "../modalLogin";

export default function Nav() {
   const stickyHeader = useRef<any>();
   const layoutState: layoutStateType = useSelector(layoutSelector);
   const [menuOpened, setMenuOpened] = useState<boolean>(false);
   const [modalLogin, setModalLogin] = useState<boolean>(false);
   const {data, status} = useSession()

   console.log(data)
  
   return (
      <nav
         id="nav-header"
         ref={stickyHeader}
         className={`px-2 bg-white border-gray-200 ${
            layoutState.isSticky ? "sticky-nav" : "normal-nav"
         } transition-all ease-in delay-300`}
      >
         {" "}
         {/*  dark:bg-gray-900 dark:border-gray-700 */}
         <div
            className={` ${
               layoutState.isSticky ? "" : "container"
            } flex flex-wrap items-center justify-between mx-auto`}
         >
            <a href="#" className="flex items-center">
               <span className=" font-bold text-2xl">LOGO</span>
            </a>
            <button
               onClick={function () {
                  setMenuOpened((v) => !v);
               }}
               onBlur={() => setMenuOpened(false)}
               data-collapse-toggle=" navbar-multi-level"
               type="button"
               className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
               aria-controls="navbar-multi-level"
               aria-expanded="false"
            >
               <span className="sr-only">Open main menu</span>
               <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                     clipRule="evenodd"
                  ></path>
               </svg>
            </button>
            <div
               className={` ${
                  menuOpened ? "" : "hidden"
               } ease-in-out duration-500 transition-all transform group-first:block w-full md:block md:w-auto`}
               id="navbar-multi-level"
            >
               <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                  {/*  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 */}
                  <li>
                     <a
                        href="#"
                        className="block py-2 pl-3 pr-4 font-bold text-[12pt] text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                        //  md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent
                        aria-current="page"
                     >
                        Home
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block py-2 pl-3 pr-4 font-bold text-[12pt] text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                        //  dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                     >
                        Shop
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block py-2 pl-3 pr-4 font-bold text-[12pt] text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                     >
                        Blog
                     </a>
                  </li>
                  <li>
                     {
                        status === "unauthenticated" ?   <button
                           onClick={() => setModalLogin((v) => !v)}
                           style={{
                              padding: "5px 25px",
                           }}
                           className="
                              block font-bold text-[12pt] 
                              bg-[#6C8380]
                              text-white
                              rounded-xl
                              md:border-0 md:p-0"
                        >
                           Sign in
                        </button> :  <button
                           onClick={() => signOut({redirect:true}) }
                           style={{
                              padding: "5px 25px",
                           }}
                           className="
                              block font-bold text-[12pt] 
                              bg-[#6C8380]
                              text-white
                              rounded-xl
                              md:border-0 md:p-0"
                        >
                           Sign out
                        </button>
                     }
                  </li>
               </ul>
            </div>
         </div>
                     {status  === "unauthenticated" && <ModalLogin show={modalLogin} onHide={()=>setModalLogin(false)} />
        }
      </nav>
   );
}
