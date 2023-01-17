import { ActionTypeEnum, ActionMenu } from "@prisma/client";
import { CSSProperties, StyleHTMLAttributes, ClassAttributes } from "react";
import { AlertComponentTypes } from "../../../components/alert";

export type contextMenuType = {
   name : JSX.Element | string | undefined,
   style? : CSSProperties,
   onClick : (data? : any, menu?: contextMenuType, indexMenu?: number ) => any,
   className?: ClassAttributes;
}

export type actionSelectedType= {
   id: number,
   function_name: string,
   type: ActionTypeEnum,
   name: string
} & ActionMenu

export declare interface layoutStateType {
   sidebarOpen: boolean;
   title?: string;
   isSticky?: boolean = false;
   screenSize?: { width:number, height:number };
   alertList? : Array<AlertComponentTypes & { unique : number }>,
   actionSelected: Array<actionSelectedType>,
   contextMenu?: {
      show: boolean;
      x: number;
      y: number;
      listMenu: Array<contextMenuType>;
      indexSelected: number | null;
   };
   breadcrumbs?: Array<{
      url:string,
      name:string,
      isActive:boolean
   }>,
   loading: {
      isLoading: boolean = false;
      loadingText: string = "Please Wait";
   };
}
