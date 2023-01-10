import React from "react";

declare type itemTypes = object

declare type fieldListTypes = {
   title : string,
   fieldName? : string | typeof itemTypes,
   onRenderValue? : (item: any) => JSX.Element,
   onRender? : (item: any, field?:string  | typeof itemTypes) => JSX.Element,
}


export declare interface tableDetailProps extends React.PropsWithChildren {
   fieldList : Array<fieldList>;
   item : itemTypes;
   withHeader? : boolean;
   onRenderHeader? : (item: any) => JSX.Element,
   headerTitle? : JSX.Element,
   subHeaderTitle? : JSX.Element
   
}