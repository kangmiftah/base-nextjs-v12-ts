import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { axiosBaseQuery } from "../../../../_modules/api";

const menuPageService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/api/users-management/menu",
   }),
   reducerPath: "menuPageServices",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },

   tagTypes: ["Management Users/menu"],
   endpoints: (builder) => ({
      getAllMenus: builder.query({
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
      addOrUpdateMenus: builder.mutation({
         query(data: bodyUser) {
            return {
               url: "",
               method: data.id ? "PUT" : "POST",
               data,
            };
         }
      }),
      getDetilMenu: builder.mutation({
         query(arg: object) {
            return {
               url:"",
               queryParam: arg,
               method:"GET"
            }
         }
      }),
      deleteMenus: builder.mutation({
         query(data: any){
            return {
               url: "",
               method:"DELETE",
               data,
            };
         }
      })
   }),
});

export const {
   useAddOrUpdateMenusMutation,
   useDeleteMenusMutation,
   useGetAllMenusQuery,
   useLazyGetAllMenusQuery,
   useGetDetilMenuMutation
} = menuPageService;

export const { getAllMenus } = menuPageService.endpoints;

export default menuPageService;
