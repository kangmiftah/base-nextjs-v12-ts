import { ClassType, CSSProperties, HTMLAttributes, PropsWithRef } from "react";

export declare type MenuDropdownTypes = {
   name: string;
   onClick: (data: {} | undefined)=> void;
   urlHref: string | '#';
}

export declare interface MenuDropdownProps extends PropsWithRef  {
   title : string;
   menuItems : Array<MenuDropdownTypes>;


}