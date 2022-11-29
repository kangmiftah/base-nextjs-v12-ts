import Image from "next/image";
import { useState } from "react";
import example1 from "./example1.jpg";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { CardProductProps } from "../../@types/components/cardProduct";
import { thousandSparator } from "../../_modules/helpers";
export default function (props : CardProductProps): JSX.Element {
   return (
      <div
         className={`relative h-[400px] rounded-2xl p-0 overflow-hidden shadow-md`}
      >
        { props.data.isDisc && <div className=" absolute bg-[#8DAAA6] top-[10px] right-[10px] z-10 text-white rounded-full text-sm px-3 py-1 ">
            { props.data.disc }
         </div>}
         <div className="">
            <div className="flex group hover:bg-[rgba(175,175,175,0.7)] absolute h-[275px] w-full z-10 align-middle">
               <button onClick={(e) => props.onClickDetail?.(e, props.data)} className=" group-hover:block hidden bg-white rounded-sm px-5 mx-auto my-auto hover:bg-blue-500 hover:text-white">
                  Detail
               </button>
            </div>
            <Image
               alt=""
               className=" relative object-cover w-full h-[275px]"
               src={props.data.imageSrc || example1}
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
               <h1 className=" text-sm">{props.data.title}</h1>
               <h6 className="font-bold text-[9pt]">Rp. {thousandSparator(String(props.data.finalPrice || 0))},-</h6>
               { props.data.isDisc && <div className="text-[7pt]"><span className="px-1 bg-fuchsia-200 rounded-sm text-fuchsia-600">{props.data.disc}</span> <span className=" line-through">Rp.{thousandSparator(String(props.data.priceBefore))}</span></div>}
               <p className="p-1 text-xs line-clamp-3">
                  {props.data.description}
               </p>
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
