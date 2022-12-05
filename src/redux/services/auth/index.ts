import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "../../../_modules/api";

const authService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/auth",
   }),
   reducerPath: "authServices",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },
   tagTypes: ["login"],
   endpoints: (builder) => ({
      login: builder.mutation({
         query(data){
            console.log(data)
            return {
               url:"/login",
               method:"POST"
            }
         }
      })
   }),
});

export const {  useLoginMutation } = authService;

export const {  } = authService.endpoints;
export default authService;
