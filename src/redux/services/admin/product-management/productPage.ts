import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { bodyUser } from "../../../../@types/backend/admin/users-management";
import { BaseResponseAPI } from "../../../../@types/backend/response";
import { axiosBaseQuery } from "../../../../_modules/api";

const productPageService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "/api/product-management/product",
   }),
   reducerPath: "productManagementPages",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },

   tagTypes: ["/product-management/product"],
   endpoints: (builder) => ({
      getAll: builder.query({
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
      addOrUpdate: builder.mutation({
         query(data: bodyUser) {
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
      delete: builder.mutation({
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
   useAddOrUpdateMutation,
   useDeleteMutation,
   useGetAllQuery,
   useLazyGetAllQuery,
   useGetDetilMutation
} = productPageService;

export const { getAll } = productPageService.endpoints;

export default productPageService;
