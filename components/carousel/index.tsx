import React, {
   ReactElement,
   useCallback,
   useEffect,
   useRef,
   useState,
} from "react";
import { CarouselPropsType } from "../../@types/components/carousel";

export default function ({
   children,
   showControlButton = true,
   className,
   style,
   controlButtonStyle,
   classNameControlButton,
   isAuto = true,
   intervalAuto = 3000,
}: CarouselPropsType): JSX.Element {
   const refD = useRef<any>(null);
   const [isOpen, setIsopen] = useState<number>(0);

   const next = function () {
      setIsopen((x) => (x >= React.Children.count(children) - 1 ? 0 : x + 1));
   };

   function prev() {
      setIsopen((x) => (x <= 0 ? React.Children.count(children) - 1 : x - 1));
   }

   useEffect(() => {
      if (isAuto) {
         const id = setInterval(() => next(), intervalAuto);

         return () => {
            clearInterval(id);
         };
      }
   }, []);

   return (
      <>
         <div
            ref={refD}
            id="default-carousel"
            className={`relative block ${className} mb-10`}
            data-carousel="static"
            style={{
               ...style,
            }}
         >
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-56 overflow-hidden rounded-2xl md:h-[450px] w-full">
               {React.Children.map(
                  children,
                  (child: React.ReactNode, i: number) => {
                     let nameClass =
                        isOpen == i
                           ? "0px"
                           : `${100 * (isOpen + 1 - (i + 1))}%`;
                     return (
                        <div
                           key={i}
                           className={` duration-700 ease-in-out absolute inset-0 transition-all transform 
                           ${i === isOpen ? "z-20" : "z-10"}
                        `}
                           data-carousel-item
                           style={{
                              transform: `translate(${nameClass})`,
                           }}
                        >
                           {child}
                           {/* <div className={`w-100 h-100 h-[450px] ${v}`}></div> */}
                        </div>
                     );
                  }
               )}
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex md:bottom-[-15px]  right-[70px]">
               {/* {showIndicatorButton &&
                  React.Children.map(
                     children,
                     (child: React.ReactNode, i: number) => (
                        <button
                           type="button"
                           style={indicatorButtonStyle}
                           className={`duration-700 ease-in-out rounded-full transition-all ${classNameIdicatorButton} ${
                              i === isOpen ? "bg-gray-800" : "bg-[#6C8380]"
                           } md:w-10 md:h-10 h-7 w-7 hover:bg-gray-800 hover:border-[#6C8380] border-3`}
                           onClick={() => setIsopen(i)}
                        ></button>
                     )
                  )} */}

               {showControlButton && (
                  <>
                     <button
                     type="button"
                     className={`${classNameControlButton} z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none`}
                     data-carousel-prev
                     style={controlButtonStyle}
                     onClick={prev}
                  >
                     <span
                        className="
                           inline-flex 
                           items-center 
                           justify-center w-8 h-8 
                           rounded-full sm:w-10 sm:h-10 
                           bg-[#6C8380]
                           group-hover:bg-[#6C8380]/50
                           group-focus:outline-none
                        "
                     >
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                     className={`${classNameControlButton} z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none`}
                     data-carousel-next
                     style={controlButtonStyle}
                     onClick={next}
                  >
                     <span className="
                        inline-flex items-center 
                        justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 
                        bg-[#6C8380]
                        group-hover:bg-[#6C8380]/50
                        group-focus:outline-none">
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5sm:w-6 sm:h-6 text-white"
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
                  </>
               )}
            </div>
            {/* <!-- Slider controls --> */}
            {false && (
               <>
                  <button
                     type="button"
                     className={`${classNameControlButton} absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
                     data-carousel-prev
                     style={controlButtonStyle}
                     onClick={prev}
                  >
                     <span
                        className="
                  inline-flex 
                  items-center 
                  justify-center w-8 h-8 
                  rounded-full sm:w-10 sm:h-10 
                  bg-white/30
                  group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none"
                     >
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
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
                     className={`${classNameControlButton} absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
                     data-carousel-next
                     style={controlButtonStyle}
                     onClick={next}
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
               </>
            )}
         </div>
      </>
   );
}
