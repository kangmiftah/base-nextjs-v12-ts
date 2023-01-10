import { contextMenuType } from "../../redux";

declare type tyepOfAction = "DROPDOWN" | "CONTEXTMENU"
declare type columnType = {
   title: string;
   field: string;
   onRender?: (item: any) => any;
   width?: string;
   style?: React.CSSProperties;
   className?: React.ClassAttributes;
}

export declare type actionType = {
   onRender?: (item: any) => boolean
} & contextMenuType

export declare interface TableGridProps {
   columns: Array<columnType>;
   isLoading: boolean;
   data: Array<object>;
   withAction: boolean;
   iterationNumber: boolean;
   actionsMenu?: Array<actionType>;
   actionMenuType?: tyepOfAction;
   pagination? : boolean;
   maxHeight? : string | number;
   minHeight? : string | number;
   withChild? : boolean;
   renderChild? : (item: any) => JSX.Element;
   onOpenChild? : (item: any) => any
   loadingChild? : boolean;
   headerSize? : "default" | "small"
}