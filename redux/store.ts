import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import * as reducer from "./slices";
import { createWrapper } from "next-redux-wrapper";
import { getData } from "./services/test";
const store = configureStore({
   reducer,
   devTools: true,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: getData,
      },
      serializableCheck: false,
    }),
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
