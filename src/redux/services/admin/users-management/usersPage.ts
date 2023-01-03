import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { axiosBaseQuery } from "../../../../_modules/api";

const usersPageService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/api/",
   }),
   reducerPath: "usersPageServices",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },

   tagTypes: ["Get All Users"],
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: ({filter, pagination} : { filter : { search: string }, pagination?: { page: number, show: number}  } ) => ({
            "url" : "users-management/users",
            queryParam: {
               ...filter, ...pagination
            }
         }),
         transformResponse(resp : any){
            if(resp.code === "00") return resp.data;
            else return []
         }
      })
   }),
});


export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = usersPageService;

export const { getAllUsers } = usersPageService.endpoints;

export default usersPageService;
