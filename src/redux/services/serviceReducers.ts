import exampleService from './examples';
import testService from './test';

export default {
   [exampleService.reducerPath] : exampleService.reducer,
   [testService.reducerPath] : testService.reducer
}