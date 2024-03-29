import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import categoryPageService from "./admin/product-management/categoryPage";
import productPageService from "./admin/product-management/productPage";
import menuPageService from "./admin/users-management/menuPage";
import rolePageService from "./admin/users-management/rolesPage";
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
      usersPageService.middleware,
      rolePageService.middleware,
      menuPageService.middleware,
      categoryPageService.middleware,
      productPageService.middleware
   )