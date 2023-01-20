import categoryPageService from './admin/product-management/categoryPage';
import productPageService from './admin/product-management/productPage';
import menuPageService from './admin/users-management/menuPage';
import rolePageService from './admin/users-management/rolesPage';
import usersPageService from './admin/users-management/usersPage';
import authService from './auth';
import exampleService from './examples';
import testService from './test';

export default {
   [exampleService.reducerPath] : exampleService.reducer,
   [testService.reducerPath] : testService.reducer,
   [authService.reducerPath] : authService.reducer,
   [usersPageService.reducerPath] : usersPageService.reducer,
   [rolePageService.reducerPath] : rolePageService.reducer,
   [menuPageService.reducerPath] : menuPageService.reducer,
   [categoryPageService.reducerPath] : categoryPageService.reducer,
   [productPageService.reducerPath] : productPageService.reducer
}