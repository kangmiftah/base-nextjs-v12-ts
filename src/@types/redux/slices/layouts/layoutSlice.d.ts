export declare interface layoutStateType {
   sidebarOpen: boolean;
   title?: string;
   isSticky?: boolean = false;
   screenSize?: { width:number, height:number };
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
