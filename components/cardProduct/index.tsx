import Image from "next/image";
import { useState } from "react";
import example1 from "./example1.jpg";
import { AiOutlineWhatsApp } from "react-icons/ai";
export default function (): JSX.Element {
   return (
      <div
         className={`relative h-[400px] rounded-2xl p-0 overflow-hidden shadow-md `}
      >
         <div className=" absolute bg-[#8DAAA6] top-[10px] right-[10px] z-10 text-white rounded-full text-sm px-3 py-1 ">
            20%
         </div>
         <div className="">
            <div className="flex group hover:bg-[rgba(175,175,175,0.7)] absolute h-[275px] w-full z-10 align-middle">
               <button className=" group-hover:block hidden bg-white rounded-sm px-5 mx-auto my-auto hover:bg-blue-500 hover:text-white">
                  Detail
               </button>
            </div>
            <Image
               alt=""
               className=" relative object-cover w-full h-[275px]"
               src={example1}
            />
         </div>
         <div
            className="
               absolute bg-white 
               h-[175px] z-20 w-full 
               bottom-[-50px] 
               hover:bottom-0 hover:rounded-2xl transform duration-500 transition-all
               hover:bg-[rgba(255,255,255,0.8)] 
               p-0
            "
         >
            <div className="h-[125px] border-b-2 border-solid px-3 py-2 ">
               <h1 className=" text-md">Kentang Qtela</h1>
               <h6 className="font-bold text-[10pt]">Rp. 80.000,-</h6>
               <div className="text-[7pt]"><span className="px-1 bg-fuchsia-200 rounded-sm text-fuchsia-600">20%</span> <span className=" line-through">Rp.10.000</span></div>
               <div className="p-1 text-xs h-full truncate ...">
                  Kentang renyah murah meriah
               </div>
            </div>
            <div className="h-[50px] grid grid-cols">
               <div className="text-center align-middle flex">
               
                  <AiOutlineWhatsApp className="m-auto text-red hover:cursor-pointer"  size={30} />
               </div>
            </div>
         </div>
      </div>
   );
}
