import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import * as reducer from "./slices";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const store = configureStore({
   reducer,
   devTools: true,
});
const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action
>;
export const wrapper = createWrapper<AppStore>(makeStore);
export default store;