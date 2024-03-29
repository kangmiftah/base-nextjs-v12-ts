import { SideConfigType, SideMenuProps } from "../../../@types/components";
import * as Fi from "react-icons/fi";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { IconTypeEnum, Menu } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../redux/slices/layouts/layoutSlice";
import { actionSelectedType } from "../../../@types/redux";

const ComponentIconMenu = {
   ...Fi,
};
const sideConfig: SideConfigType[] = [
   {
      title: "Dashboard",
      haveChild: false,
      link: "/",
      icon: <Fi.FiBarChart2 />,
   },
   {
      title: "Data 1",
      haveChild: false,
      link: "/",
      icon: <Fi.FiBarChart2 />,
   },
   {
      title: "Data 2",
      haveChild: true,
      link: "/",
      icon: <Fi.FiBarChart2 />,
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
function getComponentIcon(
   iconType: IconTypeEnum | null,
   iconName: string | null
): any {
   if (!Object.keys(ComponentIconMenu).some((v) => v === iconName)) return "";
   if (iconName) {
      let Rendered =
         ComponentIconMenu[iconName as keyof typeof ComponentIconMenu];
      return <Rendered />;
   } else return "";
}
export default function (props: SideMenuProps): JSX.Element {
   const [isActive, setIsActive] = useState<{
      key: number;
      childKey?: number;
   }>({
      key: -1,
      childKey: -1,
   });
   const [isOpen, setIsOpen] = useState<number | null>(null);
   const { data, status }: { data: any; status: string } = useSession();
   const menuList: Array<Menu & { childs: Array<Menu & {actionList : Array<actionSelectedType>}>, actionList : Array<actionSelectedType> }> | [] =
      data?.menuList || [];
   let router = useRouter();
   const disp = useDispatch();

   function getPath() {
      return router.asPath?.replace("#", "");
   }
   useEffect(
      function () {
         // console.log(menuList)
         let menu = undefined;
         let childKey: undefined | number = undefined;
         let key: number = -1;
         let actionSelected : Array<actionSelectedType> = [];
         menuList.forEach((v, i) => {
            if (v.childs)
               v.childs.forEach((x, ic) => {
                  if (x.url === getPath()) {
                     childKey = ic;
                     key= i
                     menu = {
                        name: x.name,
                        url: x.url,
                        isActive: true,
                     };
                     actionSelected = x.actionList || []
                  }
               });
            if (v.url === getPath()) {
               key = i;
               childKey= undefined;
               menu = {
                  name: v.name,
                  url: v.url,
                  isActive: true,
               };
               actionSelected = v.actionList|| []
            }
         });
         if (menu) disp(layoutActions.setBreadcrumbs([menu]));
         if (actionSelected) disp(layoutActions.setActionSelected(actionSelected))
         setIsActive({
            childKey, key
         })
      },
      [router.pathname, data]
   );
   return (
      <>
         {menuList.map(
            (
               {
                  name,
                  hash_child,
                  childs = [],
                  icon = "",
                  icon_type = "COMPONENT",
                  url,
               },
               x
            ) => (
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
                           "hover:bg-sidebar-800":
                              isActive.key === x ||
                              (hash_child
                                 ? childs.some((vc) => vc.url === getPath())
                                 : url === getPath()),
                           "bg-sidebar-800":
                              isActive.key === x ||
                              (hash_child
                                 ? childs.some((vc) => vc.url === getPath())
                                 : url === getPath()),
                           // "rounded-t-md":isActive
                        }
                     )}
                  >
                     <Link
                        href={hash_child ? "#" : url}
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
                           if (hash_child)
                              setIsOpen((v) => (v === x ? null : x));
                           else {
                              router.replace(url);
                              setIsOpen(null);
                              setIsActive({ childKey: undefined, key: x });
                           }
                        }}
                     >
                        {/* <div className=""> */}
                        <span className="group-hover:font-bold ml-2 mr-5 text-lg absolute left-0">
                           {getComponentIcon(icon_type, icon)}
                        </span>
                        <span
                           className={classNames(" group-hover:font-bold text-xs", {
                              "font-bold":
                                 isActive.key === x || url === getPath(),
                           })}
                        >
                           {name}
                        </span>

                        {hash_child && (
                           <span
                              className={classNames(
                                 " absolute right-0 mt-1  duration-300 ease-in-out transition-all transform",
                                 {
                                    "rotate-90":
                                       isOpen === x ||
                                       childs.some(
                                          (vx) => vx.url === getPath()
                                       ),
                                 }
                              )}
                           >
                              <Fi.FiChevronRight />
                           </span>
                        )}
                     </Link>
                     {/* </div> */}
                     {hash_child && (
                        <dl
                           className={`${classNames(
                              " mt-3 bg-sidebar-800 py-3 rounded-md",
                              {
                                 hidden: !(
                                    isOpen === x ||
                                    childs.some((vx) => vx.url === getPath())
                                 ),
                              }
                           )}`}
                        >
                           {childs?.map((c, i) => (
                              <Link href={c.url} key={i}>
                                 <dt
                                    onClick={() => {
                                       setIsActive({
                                          key: x,
                                          childKey: i,
                                       });
                                    }}
                                    className={classNames(
                                       `
                                 mx-2 hover:font-bold 
                                 cursor-pointer rounded-md 
                                 py-1 pl-10  text-xs
                                 hover:bg-sidebar-600`,
                                       {
                                          "bg-sidebar-600":
                                             (isActive.childKey === i &&
                                                isActive.key === x) ||
                                             c.url === getPath(),
                                          "font-bold":
                                             (isActive.childKey === i &&
                                                isActive.key === x) ||
                                             c.url === getPath(),
                                       }
                                    )}
                                 >
                                    {c.name}
                                 </dt>
                              </Link>
                           ))}
                        </dl>
                     )}
                  </dt>
               </dl>
            )
         )}
      </>
   );
}
