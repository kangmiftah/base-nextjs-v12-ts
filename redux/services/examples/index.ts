import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "../../../_modules/api";

const exampleService = createApi({
   baseQuery: axiosBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com/",
   }),
   reducerPath: "exampleService",
   
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },
   tagTypes: ["posts"],
   endpoints: (builder) => ({
      getAllPosts: builder.query<Array<any>, undefined >({
         query() {
            return {
               url: "posts",
            };
         },
         transformResponse(response: any) {
            return response;
         },
         onQueryStarted(arg, api) {
            api.queryFulfilled
         },
      }),
      addPost: builder.mutation({
         query(){
            return {
               url:"",
               method:"POST"
            }
         },
         transformResponse: ({ getState })=> {
            // getState().
         }
      })
   }),
});

export const { useGetAllPostsQuery, useAddPostMutation, useLazyGetAllPostsQuery} = exampleService;

export const { getAllPosts } = exampleService.endpoints;
export default exampleService;
