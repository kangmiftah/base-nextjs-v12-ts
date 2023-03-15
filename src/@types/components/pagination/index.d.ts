

declare type paginationEventChange<T, P> = (data : T) => P
export declare type paginationDetailState = {
   page: number, 
   show: number
} 
export declare interface PaginationPropsType {
   currentPage? : number;
   currentShow?: number;
   onChangePage? : paginationEventChange<paginationDetailState, any>;
   onChangeShow? : paginationEventChange<paginationEventChange, any>;
   showList? : Array<number>
}

export declare interface PaginationPropsPrivate extends PaginationPropsType {
   dataLength: number;
   showNumbering?: boolean;
   paginationType?: "CENTERED" | "DEFAULT" | "LEFT";
   withShowList? : boolean;
   withPageInfo? : boolean;
}