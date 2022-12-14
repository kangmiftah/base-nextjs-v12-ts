import React, { ClassAttributes, CSSProperties, HTMLProps, StyleHTMLAttributes } from "react";
import { StyledJsxStyleRegistry } from "styled-jsx";

export declare interface CarouselPropsType extends React.PropsWithChildren {
   showControlButton? : boolean = true;
   className?: ClassAttributes;
   style?: CSSProperties;
   controlButtonStyle?: CSSProperties;
   classNameControlButton?: ClassAttributes;
   isAuto? : boolean = false;
   intervalAuto? : number = 0;
 
}