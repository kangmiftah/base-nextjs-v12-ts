import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { layoutActions } from "../../slices/layouts/layoutSlice";

export const getData = () => async (disp: any, getState:any) => {
   const { home } = getState();
   console.log(home);
   try {
      const resp = await axios({
         url: "https://jsonplaceholder.typicode.com/posts",
         method: "GET",
      });
      console.log(resp)
      if (resp.status === 200) {
         disp(layoutActions.toggleSidebar());
      } else {
         disp(layoutActions.toggleSidebar());
      }
   } catch (error: any) {
      console.log(error.toString())
   }
};
