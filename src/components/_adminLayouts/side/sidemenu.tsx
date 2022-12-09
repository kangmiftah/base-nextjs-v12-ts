import { SideConfigType, SideMenuProps } from "../../../@types/components";
import { FiBarChart2, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import classNames from "classnames";

const sideConfig: SideConfigType[] = [
   {
      title: "Dashboard",
      haveChild: false,
      link: "/",
      icon: <FiBarChart2 />,
   },
   {
      title: "Data 1",
      haveChild: false,
      link: "/",
      icon: <FiBarChart2 />,
   },
   {
      title: "Data 2",
      haveChild: true,
      link: "/",
      icon: <FiBarChart2 />,
      childs: [
         {
            title: "Data 2.1",
            link: "",
         },
         {
            title: "Data 2.2",
            link: "",
         },
         {
            title: "Data 2.3",
            link: "",
         },
      ],
   },
];
export default function (props: SideMenuProps): JSX.Element {
   const [isActive, setIsActive] = useState<{
      key: number;
      childKey?: number;
   }>({
      key: 0,
      childKey: 0,
   });
   const [isOpen, setIsOpen] = useState<number | null >(null)
   return (
      <>
         {sideConfig.map(({ title, haveChild, childs, icon }, x) => (
            <dl key={x} className="w-full mt-0 text-white">
               <dt
                  className={classNames(
                     `
               px-2 py-3 
               duration-700 
               ease transition-all 
               transform 
            `,
                     {
                        "hover:bg-sidebar-800": isActive.key === x,
                        "bg-sidebar-800": isActive.key === x,
                        // "rounded-t-md":isActive
                     }
                  )}
               >
                  <div
                     className="
                        group
                         
                        block 
                        relative break-words content-center w-[100%] 
                        justify-center 
                        items-center align-middle 
                        cursor-pointer
                        pr-4 pl-10
                     "
                     onClick={() => {
                           if(haveChild) setIsOpen(v=> v === x ? null : x)
                           else {
                              setIsOpen(null)
                              setIsActive({ childKey: undefined, key: x })
                           }
                     }}
                  >
                     {/* <div className=""> */}
                     <span className="group-hover:font-bold ml-2 mr-5 text-2xl absolute left-0">
                        {icon}
                     </span>
                     <span
                        className={classNames(" group-hover:font-bold", {
                           "font-bold": isActive.key === x ,
                        })}
                     >
                        {title}
                     </span>

                     {haveChild && (
                        <span
                           className={classNames(
                              " absolute right-0 mt-1  duration-300 ease-in-out transition-all transform",
                              {
                                 "rotate-90": isOpen === x,
                              }
                           )}
                        >
                           <FiChevronRight />
                        </span>
                     )}
                  </div>
                  {/* </div> */}
                  {haveChild && (
                     <dl
                        className={`${classNames(
                           " mt-3 bg-sidebar-800 py-3 rounded-md",
                           {
                              hidden: !(isOpen === x),
                           }
                        )}`}
                     >
                        {childs?.map(({ title, link }, i) => (
                           <dt
                              key={i}
                              onClick={()=> setIsActive({
                                 key:x,
                                 childKey:i
                              })}
                              className={classNames(`
                                 mx-2 hover:font-bold 
                                 cursor-pointer rounded-md 
                                 py-1 pl-10 
                                 hover:bg-sidebar-600`, {
                                    "bg-sidebar-600": isActive.childKey === i && isActive.key === x,
                                    "font-bold": isActive.childKey === i && isActive.key === x,
                                 })}
                           >
                              {title}
                           </dt>
                        ))}
                     </dl>
                  )}
               </dt>
            </dl>
         ))}
      </>
   );
}
