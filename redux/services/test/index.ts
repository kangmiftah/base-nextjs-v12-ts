import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const testService = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com/",
   }),
   reducerPath: "testService",
   extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
         return action.payload[reducerPath];
      }
   },
   tagTypes: ["postsTest"],
   endpoints: (builder) => ({
      getAllTest: builder.query({
         query: () => `posts`,
      }),
   }),
});

export const { useGetAllTestQuery, useLazyGetAllTestQuery } = testService;

export const { getAllTest } = testService.endpoints;

export default testService;
