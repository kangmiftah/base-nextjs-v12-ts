import * as React from "react";
import { ButtonColourType, ButtonProps, ButtonSizeType } from "../../@types/components/button";

function getColour(colourType: ButtonColourType): string {
   switch(colourType){
      case "danger":
         return `bg-danger 
         hover:bg-danger-600 active:bg-danger 
         `;
      case "info":
         return `bg-info 
         hover:bg-info-600 active:bg-info 
         `;
      case "primary":
         return `bg-primary 
         hover:bg-primary-600 active:bg-primary 
         `;
      case "warning":
         return `bg-warning 
         hover:bg-warning-600 active:bg-warning 
         `;
      case "secondary":
         return `bg-secondary 
         hover:bg-secondary-600 active:bg-secondary 
         `;
      default:
         return `bg-primary 
         hover:bg-primary-600 active:bg-primary `
   }
}

function getSize(size: ButtonSizeType): string {
   switch(size){
      case "sm":
         return "py-[3px]";
      case "lg":
         return "py-[7px]";
      default:
         return "py-[3px]"
   }
}

export default function (_props: ButtonProps): JSX.Element {
   let props = { ..._props };
   if (props.size === undefined) props.size = "sm";
   props.className = `
      ${props.className} ${getColour(props.color)} ${getSize(props.size)}
      focus:outline-none
      text-[10pt] px-3
      text-white rounded mr-2
      `
   if(props.type=== undefined) props.type="button"
   return <button {...props}>{props.children}</button>;
}
