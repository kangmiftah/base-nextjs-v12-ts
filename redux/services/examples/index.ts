import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const exampleService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  reducerPath:"exampleService",
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getAllPosts : builder.query({
      query:()=> `posts`
    }) 
  }),
});

export const { 
   useGetAllPostsQuery
} = exampleService

export const {
   getAllPosts
} = exampleService.endpoints
export default exampleService;