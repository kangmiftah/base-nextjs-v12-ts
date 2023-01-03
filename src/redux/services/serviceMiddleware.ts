import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import usersPageService from "./admin/users-management/usersPage";
import authService from "./auth";
import exampleService from "./examples";
import testService from "./test";

export default (getDefaultMiddleware: CurriedGetDefaultMiddleware) => 
   getDefaultMiddleware()
   .concat(
      exampleService.middleware,
      testService.middleware,
      authService.middleware,
      usersPageService.middleware
   )