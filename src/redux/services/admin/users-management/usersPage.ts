import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { axiosBaseQuery } from "../../../../_modules/api";

const usersPageService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/api/users-management/users",
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
         query: ({
            filter,
            pagination,
         }: {
            filter: { search: string };
            pagination?: { page: number; show: number };
         }) => ({
            url: "",
            queryParam: {
               ...filter,
               ...pagination,
            },
         }),
         transformResponse(resp: any) {
            if (resp.code === "00") return resp.data;
            else return [];
         },
      }),
      addUser: builder.mutation({
         query(data: bodyUser) {
            return {
               url:"",
               method: "POST",
               data,
            };
         },
        async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
         let { data } = await queryFulfilled
         
      },
      // Th
      }),
   }),
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery, useAddUserMutation } =
   usersPageService;

export const { getAllUsers } = usersPageService.endpoints;

export default usersPageService;
