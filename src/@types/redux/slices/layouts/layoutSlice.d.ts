export declare interface layoutStateType {
   sidebarOpen: boolean;
   title?: string;
   isSticky?: boolean = false;
   loading: {
      isLoading: boolean = false;
      loadingText: string = "Please Wait";
   };
}
