import React, { createContext, useContext, useState } from "react";
import {
   ModalProps,
   ModalBodyProps,
   ModalFooterProps,
   ModalHeaderProps,
   ModalState,
   ModalSizeType,
} from "../../@types/components/modal";

const modalContext = createContext<ModalState>({
   state: {},
   actions: {},
});

function getSize(size: ModalSizeType): string {
   let sizeObj = {
      sm: "w-[300px]",
      md: "w-[450px] ",
      lg: "w-[600px] ",
      xl: "w-[900px]",
      full: "w-screen",
   };
   if (!["sm", "md", "lg", "xl", "full"].some((v) => v === size))
      throw Error(`Size must be "sm" | "md" | "lg" | "xl"`);
   return sizeObj[size];
}

export default function Modal(props: ModalProps): JSX.Element {
   const [dialogClassName, setDialogClassName] = useState<string>("");
   const [inModal, setInModal] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [position, setPosition] = useState<string>(
      "top-0 right-0 h-full w-full "
   );
   React.useEffect(
      function () {
         if (props.showModal) {
            document.body.style.overflow = "hidden";
            setShowModal(true);
            setTimeout(() => setInModal(true), 200);
         } else {
            document.body.style.overflow = "auto";
            setInModal(false);
            setTimeout(() => setShowModal(false), 300);
         }
      },
      [props.showModal]
   );

   return (
      <modalContext.Provider
         value={{
            state: { size: props.size},
            actions: {
               onHide: props.onHide,
            },
         }}
      >
         <dialog
            id="backdrop-modal"
            onClick={(e) => {
               const target = e.target as HTMLElement;
               if (target.id === "backdrop-modal") {
                  if (props.backdrop === "static") {
                     setDialogClassName("animate-shake");
                     setTimeout(() => setDialogClassName(""), 500);
                  } else {
                     props.onHide?.();
                  }
               }
            }}
            className={` 
               overflow-hidden
               fixed ${position} backdrop-blur-sm z-[80] bg-transparent
               justify-center items-center h-modal 
               duration-800 ease-in-out transform transition-all
            ${showModal ? "flex" : "hidden"} 
      `}
         >
            <div
               style={{
                  ...props.style,
               }}
               className={`relative ${dialogClassName} 
                  duration-800 ease-in-out transform transition-all
                  bg-white rounded h-auto
                   shadow-md overflow-auto max-w-screen max-h-[calc(calc(100vh_-_25px))]
                  ${inModal ? "translate-y-0" : "-translate-y-[500%]"}
                  ${getSize(props.size || "md")} 
                  max-w-full
                  ${props.className}`}
            >
               {props.children}
            </div>
         </dialog>
      </modalContext.Provider>
   );
}
const useModal = (): ModalState => useContext(modalContext);
Modal.Header = function (props: ModalHeaderProps) {
   const {
      actions,
      state
   } = useModal()
   return (
      <div className="flex justify-center items-center min-h-[50px] max-h-[150px] overflow-hidden border-b-[1pt] border-solid border-gray-200 w-full ">
         { props.closeBtn && <span onClick={actions.onHide} className="absolute mr-2 right-2 cursor-pointer z-10" >X</span>}
         <div className="relative w-full p-2">{props.children}</div>
      </div>
   );
};
Modal.Body = function (props: ModalBodyProps) {
   const {
      actions,
      state
   } = useModal()
   // ${ state.size === "full" ? "h-[calc(100vh_-_150px)]" : "min-h-[50px]"} 
   return (
      <div className={`flex justify-center items-center w-full min-h-[50px] overflow-auto `}>
         <div className="relative w-full p-2 ">{props.children}</div>
      </div>
   );
};
Modal.Footer = function (props: ModalFooterProps) {
   return (
      <div className="flex bottom-0 justify-center items-center min-h-[50px] max-h-[150px] overflow-hidden border-t-[1pt] border-solid border-gray-200 w-full ">
         <div className="relative w-full p-2">{props.children}</div>
      </div>
   );
};
