import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { axiosBaseQuery } from "../../../../_modules/api";

const rolePageService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/api/users-management/roles",
   }),
   reducerPath: "rolePageServices",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },

   tagTypes: ["Management Users/Roles"],
   endpoints: (builder) => ({
      getAllRoles: builder.query({
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
      addOrUpdateRoles: builder.mutation({
         query(data: any) {
            return {
               url: "",
               method: data.id ? "PUT" : "POST",
               data,
            };
         }
      }),
      getDetil: builder.mutation({
         query(arg: object) {
            return {
               url:"",
               queryParam: arg,
               method:"GET"
            }
         }
      }),
      getAccessMenu: builder.mutation({
         query(arg: object) {
            return {
               url :"/access-menu",
               queryParam : arg,
               method : "GET"
            }
         }
         }),
      deleteRoles: builder.mutation({
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
   useAddOrUpdateRolesMutation,
   useDeleteRolesMutation,
   useGetAllRolesQuery,
   useLazyGetAllRolesQuery,
   useGetDetilMutation,
   useGetAccessMenuMutation
} = rolePageService;

export const { getAllRoles } = rolePageService.endpoints;

export default rolePageService;
