import { Action, AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { layoutStateType } from "../../../@types/redux/slices/layouts/layoutSlice";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../../store";
const initialState: layoutStateType = {
   sidebarOpen: true,
   title: "Aran Ui",
   isSticky: false,
   loading: {
      isLoading: false,
      loadingText: "Please Wait"
   }
};

interface RejectedAction extends Action {
   error: Error
 }
 function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('rejected')
  }
const layoutSlice = createSlice({
   name: "layout",
   initialState,
   reducers: {
      closeSidebar: (state: layoutStateType) => ( {...state, sidebarOpen: false} ),
      toggleSidebar: (state) => {
         return {
            ...state,
            sidebarOpen: !state.sidebarOpen,
         };
      },
      setNavSticky : (state: layoutStateType, action: PayloadAction<boolean>) =>{
         return {
            ...state,
            isSticky: action.payload
         }
      },
      setLoading : (state: layoutStateType, action: PayloadAction<layoutStateType["loading"]>) => {
         return {
            ...state,
            loading: action.payload

         }
      }
   },
   extraReducers(builder) {
      builder
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
   },
});

export const layoutActions = layoutSlice.actions;
export const layoutSelector = (state: RootState) : layoutStateType => state.layout;
export default layoutSlice.reducer;
