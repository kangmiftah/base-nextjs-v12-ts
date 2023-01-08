import React from 'react';

export declare type ModalSizeType = "sm" | "md" | "lg" | "xl" | "full";

export declare interface ModalState {
      state : {
         size? : ModalSizeType = "md";
      },
      actions : {
         onHide? : () => void
      }
}

export declare interface ModalProps extends React.PropsWithChildren {
   size? : ModalSizeType = "md";
   className? : React.ClassAttributes = "";
   style? : React.CSSProperties = {};
   showModal : boolean = false;
   backdrop? : "default" | "static" = "static";
   onHide? : () => void

}

export declare interface ModalHeaderProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
   closeBtn? : boolean = false;
}

export declare interface ModalFooterProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
}

export declare interface ModalBodyProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
}