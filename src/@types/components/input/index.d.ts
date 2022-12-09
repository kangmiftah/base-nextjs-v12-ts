import React, {
   HTMLProps,
   InputHTMLAttributes,
   PropsWithRef,
   RefObject,
} from "react";

export type InputSize = "sm" | "lg" | undefined
export declare interface InputTextProps extends HTMLProps<HTMLInputElement> {
   ref?: RefObject<HTMLInputElement>;
   sizeInput?: InputSize ="sm";
   type?: "text" | "alphabet" | "password" 
}
