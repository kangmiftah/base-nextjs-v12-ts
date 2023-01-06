import {
   Action,
   AnyAction,
   createSlice,
   PayloadAction,
} from "@reduxjs/toolkit";
import { layoutStateType } from "../../../@types/redux/slices/layouts/layoutSlice";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../../store";
import { AlertComponentTypes } from "../../../@types/components/alert";
const initialState: layoutStateType = {
   sidebarOpen: true,
   title: "Aran Ui",
   isSticky: false,
   screenSize: { width: 0, height: 0 },
   breadcrumbs: [],
   alertList: [],
   contextMenu: {
      show: false,
      x: 0,
      y: 0,
      listMenu: [],
      indexSelected: null,
   },
   loading: {
      isLoading: false,
      loadingText: "Please Wait",
   },
};

interface RejectedAction extends Action {
   error: Error;
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
   return action.type.endsWith("rejected");
}
const layoutSlice = createSlice({
   name: "layout",
   initialState,
   reducers: {
      closeSidebar: (state: layoutStateType) => ({
         ...state,
         sidebarOpen: (state.screenSize?.width || 0) < 768,
      }),
      toggleSidebar: (state) => {
         return {
            ...state,
            sidebarOpen: !state.sidebarOpen,
         };
      },
      setSizeScreen: (
         state: layoutStateType,
         action: PayloadAction<layoutStateType["screenSize"]>
      ) => ({ ...state, screenSize: action.payload }),
      setNavSticky: (
         state: layoutStateType,
         action: PayloadAction<boolean>
      ) => {
         return {
            ...state,
            isSticky: action.payload,
         };
      },
      setLoading: (
         state: layoutStateType,
         action: PayloadAction<layoutStateType["loading"]>
      ) => {
         return {
            ...state,
            loading: action.payload,
         };
      },
      setBreadcrumbs: (
         state: layoutStateType,
         action: PayloadAction<layoutStateType["breadcrumbs"]>
      ) => {
         return {
            ...state,
            breadcrumbs: action.payload,
         };
      },
      setContextMenu(
         state: layoutStateType,
         action: PayloadAction<layoutStateType["contextMenu"]>
      ) {
         return {
            ...state,
            contextMenu: action.payload,
         };
      },
      closeContextMenu(state: layoutStateType) {
         return {
            ...state,
            contextMenu: {
               show: false,
               x: 0,
               y: 0,
               listMenu: [],
               indexSelected: null,
            },
         };
      },
      openAlert(
         state: layoutStateType,
         action: PayloadAction<AlertComponentTypes>
      ) {
         let unique: number = 0;
         if((state.alertList || []).length > 0) unique = (state.alertList || [])[(state.alertList || []).length -1]?.unique + 1
         console.log(unique)
         return {
            ...state,
            alertList: [...(state.alertList || []), { ...action.payload, unique}],
         };
      },
      closeAlert(state: layoutStateType, action: PayloadAction<number>) {
         console.log(action)
         return {
            ...state,
            alertList: (state.alertList || []).filter(
               (c, i) => c.unique !== action.payload
            ),
         };
      },
      clearAlert(state: layoutStateType) {
         return { ...state, alertList: [] };
      },
   },
   extraReducers(builder) {
      builder
         .addMatcher(
            isRejectedAction,
            // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            (state, action) => {}
         )
         // and provide a default case if no other handlers matched
         .addDefaultCase((state, action) => {});
   },
});

export const layoutActions = layoutSlice.actions;
export const layoutSelector = (state: RootState): layoutStateType =>
   state.layout;
export default layoutSlice.reducer;
