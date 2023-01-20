import React, {
   ClassAttributes,
   HTMLProps,
   InputHTMLAttributes,
   PropsWithChildren,
   PropsWithRef,
   RefObject,
} from "react";
import { InputProps, StylesConfig } from "react-select";
import PropTypes from "prop-types";

export type InputSize = "sm" | "lg" | undefined;
export declare interface InputTextProps extends HTMLProps<HTMLInputElement> {
   ref?: RefObject<HTMLInputElement>;
   sizeinput?: InputSize = "sm";
   type?: "text" | "alphabet" | "password" | "email";
}

export declare interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
   ref?: RefObject<HTMLTextAreaElement>;
}

export declare interface InputNumberProps extends HTMLProps<HTMLInputElement> {
   ref?: RefObject<HTMLInputElement>;
   sizeinput?: InputSize = "sm";
   typeInput?: "currency" | "int" | "float";
}

export declare interface InputCheckBoxProps
   extends PropsWithChildren,
      HTMLProps<HTMLInputElement> {}

export declare interface SelectOptionPorps
   extends HTMLProps<HTMLSelectElement> {
   ref?: RefObject<HTMLSelectElement>;
   sizeinput?: InputSize = "sm";
}

export declare interface AsyncSelect2Props {
   name?: string;
   value?:any;
   onChange?: (value: Select2Props["value"]) => any;
   asyncDataSelect?: (
      inputValue?: string
   ) => Array<{ value: string; label: string }>;
   required?: boolean = false;
   withCallApi?: boolean = false;
   options?: Array<{ value: string; label: string }> = [];
   className?: ClassAttributes;
   styles?: StylesConfig;
   sizeinput?: InputSize = "sm";
   placeholder?: string = ""
}
