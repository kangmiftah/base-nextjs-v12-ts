import { BaseQueryFn, EndpointDefinition, Api, Module, buildCreateApi, coreModule } from "@reduxjs/toolkit/query";

const customeModuleName = Symbol();

export type CustomeModule = typeof customeModuleName;
export declare interface apiType<
   BaseQuery extends BaseQueryFn,
   Definitions extends EndpointDefinition,
   ReducerPath extends string,
   TagTypes extends string
> {
   [customeModuleName]: {
      endpoints: {
         [K in keyof Definitions]: {
            myEndpointProperty: string
         }
      }
   }
   
}