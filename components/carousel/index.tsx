import { ReactElement } from "react";
import { CarouselPropsType } from "../../@types/components/carousel";
import styleCarousel from './carousel.module.css';

export default function (props: CarouselPropsType): ReactElement {

   return (
      <>
         <div id="default-carousel" className="relative" data-carousel="static">
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-[450px]">
               {/* <!-- Item 1 --> */}
               <div
                  className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20  "
                  data-carousel-item
               >
                  <div className="w-100 h-100 h-[450px] bg-[#8DAAA6]">
                     <h1>TEST</h1>
                  </div>
               </div>
               {/* <!-- Item 2 --> */}
               <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
               ></div>
               {/* <!-- Item 3 --> */}
               <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
               ></div>
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex space-x-2 -translate-x-1/2 md:bottom-[-15px] bottom-[-10px] right-0">
               <button
                  type="button"
                  className="rounded-full bg-[#6C8380] md:w-10 md:h-10 h-7 w-7 hover:bg-gray-800 hover:border-[#6C8380] border-3"
                  aria-current="false"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
               ></button>
               <button
                  type="button"
                  className="rounded-full bg-[#6C8380]  md:w-10 md:h-10  h-7 w-7"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
               ></button>
               
            </div>
            {/* <!-- Slider controls --> */}
            <button
               type="button"
               className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
               data-carousel-prev
            >
               <span className="
                  inline-flex 
                  items-center 
                  justify-center w-8 h-8 
                  rounded-full sm:w-10 sm:h-10 
                  bg-gray-800/30 
                  group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                     aria-hidden="true"
                     className="w-5 h-5 text-white sm:w-6 sm:h-6 text-gray-800"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                     ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
               </span>
            </button>
            <button
               type="button"
               className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
               data-carousel-next
            >
               <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                     aria-hidden="true"
                     className="w-5 h-5sm:w-6 sm:h-6 text-gray-800"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                     ></path>
                  </svg>
                  <span className="sr-only">Next</span>
               </span>
            </button>
         </div>
      </>
   );
}
