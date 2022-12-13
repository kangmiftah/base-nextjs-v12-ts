import React from "react";
import {
   CardBodyProps,
   CardFooterProps,
   CardHeaderProps,
   CardProps,
} from "../../@types/components/card";

export default function Card(props: CardProps): JSX.Element {
   function getSize(): string {
      if (props.size === undefined) return "100%";
      if (typeof props.size === "number") return `${props.size}px`;
      if (typeof props.size === "string") return props.size;
      else return "100%";
   }
   return (
      <div
         style={{
            ...props.style,
            width: getSize(),
         }}
         className={`relative 
      duration-800 ease-in-out transform transition-all
      bg-white rounded 
       overflow-auto min-h-[200px] w-[200px] shadow-md 
      max-w-full
      ${props.className}`}
      >
         {props.children}
      </div>
   );
}

function Header(props: CardHeaderProps): JSX.Element {
   return (
      <div
         className="relative top-0 px-3
            items-center
            min-h-[50px] overflow-hidden 
            border-b-[1pt] border-solid border-gray-200 w-full py-3"
      >
         {props.children}
      </div>
   );
}
function Body(props: CardBodyProps): JSX.Element {
   return (
      <div style={{ ...props.style}}
         className={`relative min-h-[100px] p-3 ${props.className}`}
      >
         {props.children}
      </div>
   );
}
function Footer(props: CardFooterProps): JSX.Element {
   return (
      <div
         className="relative bottom-0 px-3
      items-center
      min-h-[50px] overflow-hidden 
      border-t-[1pt] border-solid border-gray-200 w-full py-3"
      >
         {props.children}
      </div>
   );
}

Card.Body = Body;
Card.Footer = Footer;
Card.Header = Header;
