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
   type?: "text" | "alphabet" | "password" | "email";

}

export declare interface TextAreaProps extends HTMLProps<HTMLTextAreaElement>{
   ref?: RefObject<HTMLTextAreaElement>;
}

export declare interface InputNumberProps extends HTMLProps<HTMLInputElement> {
   ref?: RefObject<HTMLInputElement>;
   sizeInput?: InputSize ="sm";
   typeInput?: "currency" | "int" | "float";
   
}



export declare interface SelectOptionPorps extends HTMLProps<HTMLSelectElement> {
   ref?: RefObject<HTMLSelectElement>;
   sizeInput?: InputSize ="sm";
}