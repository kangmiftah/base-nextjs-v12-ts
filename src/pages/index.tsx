import Head from "next/head";
import Image from "next/image";
import { CardProduct, Carousel, PublicLayout } from "../components/";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
const test = [
   "bg-[#8DAAA6]",
   "bg-[#FFAAA6]",
   "bg-[#8DAFFF]",
   "bg-[#8DAEAE]",
   "bg-[#8D1D2E]",
   "bg-[#8D1D2E]",
];
export default function Home() {
   const { data } = useSession();
   console.log(data)
   return (
      <>
         <div className="grid grid-rows grid-flow-col">
            <Carousel>
               {test.map((v) => (
                  <div className={`w-100 h-100 h-[450px] ${v}`}></div>
               ))}
            </Carousel>
         </div>
         <div className=" grid grid-flow-row gap-1 auto-rows-max mt-4 ">
            <div>
               <span className=" font-bold text-lg">Category</span>
               <span className=" float-right text-gray-300 text-sm cursor-pointer">
                  View all categories
               </span>
            </div>
            <div className="w-full overflow-hidden">
               <div className="h-[150px] grid grid-rows-1 lg:grid-cols-4 grid-cols-2 2xl:grid-cols-5 gap-2 animate-pulse">
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg">
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className=" grid grid-flow-row gap-1 auto-rows-max mt-4 ">
            <div>
               <span className=" font-bold text-lg">Article</span>
               <span className=" float-right text-gray-300 text-sm cursor-pointer">
                  Read more articles
               </span>
            </div>
            <div className="w-full overflow-hidden">
               <div className="h-[250px] grid grid-rows-1 lg:grid-cols-2 2xl:grid-cols-2 sm:grid-cols-1 gap-2 animate-pulse">
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg "></div>
                  </div>
                  <div className="h-full bg-[#D9D9D9] rounded-lg">
                     <div className="h-full bg-[#969696] rounded-lg "></div>
                  </div>
               </div>
            </div>
         </div>
         <div className=" grid grid-flow-row gap-1 auto-rows-max mt-4 ">
            <div>
               <span className=" font-bold text-lg">Product</span>
               <span className=" float-right text-gray-300 text-sm cursor-pointer">
                  View all products
               </span>
            </div>
            <div
               className="grid 
                sm:grid-cols-2 
                md:grid-cols-3
                lg:grid-cols-4 
                2xl:grid-cols-5
                gap-5
              "
            >
               {test.map((v, i) => (
                  <div>
                     <CardProduct
                        data={{
                           id: i,
                           description:
                              "Keripik Kentang terbaik dan murah, nikmat engga ada gantinya, silahkan untuk menikmati dengan baik",
                           isDisc: true,
                           disc: "10%",
                           priceBefore: 100000,
                           finalPrice: 90000,
                           title: "Snack QTela",
                        }}
                     />
                  </div>
               ))}
            </div>
            {/* </Carousel> */}
         </div>
      </>
   );
}

Home.getLayout = PublicLayout;
