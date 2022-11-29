import React, { PropsWithRef } from "react";

export declare type dataProductTypes = {
   id? : any;
   title? : string;
   imageSrc? : string;
   isDisc? : boolean = false;
   disc? : string;
   description? : string;
   finalPrice? : number;
   priceBefore? : number = 0;
}

export declare interface CardProductProps extends PropsWithRef {
   onClickDetail? : (event: React.SyntheticEvent, data : dataProductTypes) => void
   imageSrc? : string;
   data : dataProductTypes;
}