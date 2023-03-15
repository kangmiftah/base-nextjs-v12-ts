import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
   BaseQueryFn,
   EndpointDefinition,
   Api,
   Module,
   buildCreateApi,
   coreModule,
   BaseQueryApi,
   
} from "@reduxjs/toolkit/query";
import { CustomeModule, customeModuleName } from "../../@types/_modules/api";

export const apiFetch = axios.create({
   baseURL: "https://jsonplaceholder.typicode.com/",
   timeout: 1000,
   headers: { "X-Custom-Header": "foobar" },
});

export const axiosBaseQuery =
   (
      { baseUrl }: { baseUrl: string } = { baseUrl: "" }
   ): BaseQueryFn<
      {
         url: string;
         method?: AxiosRequestConfig["method"] | "get";
         data?: AxiosRequestConfig["data"];
         params?: AxiosRequestConfig["params"];
         queryParam?: {}
      },
      BaseQueryApi,
      {}
   > =>
   async ({ url, method, data, params, queryParam }) => {

      let uri = url
      if (queryParam) {
         var keys = Object.keys(queryParam);
         keys.forEach((val, key) => {
             if (key == 0) uri = uri + '?';
             uri = uri + (val + '=' + queryParam[val as keyof typeof queryParam]);
             if (key != keys.length - 1) uri = uri + '&';
         });
     }
      try {
         const result = await axios({
            url: baseUrl + uri,
            method,
            data,
            params,
         });
         return { data: result.data };
      } catch (axiosError) {
         let err = axiosError as AxiosError;
         return {
            error: {
               status: err.response?.status,
               data: err.response?.data || err.message,
            },
         };
      }
   };


   export const axiosBaseQueryWithToken =(
      { baseUrl }: { baseUrl: string } = { baseUrl: "" }
   ): BaseQueryFn<
      {
         url: string;
         method: AxiosRequestConfig["method"];
         data?: AxiosRequestConfig["data"];
         params?: AxiosRequestConfig["params"];
         queryParam?: {}
      },
      unknown,
      unknown
   > =>
   async ({ url, method, data, params, queryParam }, api,extraOptions) => {
      let uri = url
      if (queryParam) {
         var keys = Object.keys(queryParam);
         keys.forEach((val, key) => {
             if (key == 0) uri = uri + '?';
             uri = uri + (val + '=' + queryParam[val as keyof typeof queryParam]);
             if (key != keys.length - 1) uri = uri + '&';
         });
     }
      try {
         const result = await axios({
            url: baseUrl + uri,
            method,
            data,
            params,
         });

         // const refreshResult = await axiosBaseQuery({url: '/refreshToken'}, api, extraOptions)
         // if (refreshResult.data) {
         //    // store the new token
         //    // api.dispatch(tokenReceived(refreshResult.data))
         //    // retry the initial query
         //    // result = await baseQuery(args, api, extraOptions)
         // } else {
         //    // api.dispatch(loggedOut())
         // }
         
         return { data: result.data };
      } catch (axiosError) {
         let err = axiosError as AxiosError;
         return {
            error: {
               status: err.response?.status,
               data: err.response?.data || err.message,
            },
         };
      }
   };