import { CSSProperties, StyleHTMLAttributes } from "react";

export type contextMenuType = {
   name : JSX.Element | string | undefined,
   style? : CSSProperties,
   onClick : (data? : any, menu?: contextMenuType, indexMenu?: number ) => any
}
export declare interface layoutStateType {
   sidebarOpen: boolean;
   title?: string;
   isSticky?: boolean = false;
   screenSize?: { width:number, height:number };
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
