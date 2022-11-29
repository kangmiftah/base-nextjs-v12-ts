import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import * as reducer from "./slices";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import serviceReducers from "./services/serviceReducers";
import serviceMiddleware from "./services/serviceMiddleware";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
// const store = 
const makeStore = () => configureStore({
   reducer: {
      ...reducer,
      ...serviceReducers
   },
   devTools: true,
   middleware: serviceMiddleware,
});

export type RootState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action
>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug:true });
// export default store;