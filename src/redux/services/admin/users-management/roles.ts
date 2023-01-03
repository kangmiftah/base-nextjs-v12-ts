import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "../../../../_modules/api";

const usersService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/",
   }),
   reducerPath: "usersServices",
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


// export const { useGetAllTestQuery, useLazyGetAllTestQuery } = usersService;

// export const { getAllTest } = usersService.endpoints;

export default usersService;
