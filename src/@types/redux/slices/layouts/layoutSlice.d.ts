export declare interface layoutStateType {
   sidebarOpen: boolean;
   title?: string;
   isSticky?: boolean = false;
   screenSize?: { width:number, height:number };
   loading: {
      isLoading: boolean = false;
      loadingText: string = "Please Wait";
   };
}
