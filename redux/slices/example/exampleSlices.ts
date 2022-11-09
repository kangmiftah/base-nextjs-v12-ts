import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { exampleStateType } from "../../../@types/redux/slices/example/exampleSlices";

const initialState: exampleStateType = {
   data : [],
   count : 1
};

const exampleSlices = createSlice({
   name: "example",
   initialState,
   reducers: {
      toggleSidebar: (state) => {
         return {
            ...state,
         };
      },
   },
   extraReducers: {
      [HYDRATE]: (state) => {
         return {
            ...state,
         };
      },
   },
});

export const layoutActions = exampleSlices.actions;
export default exampleSlices.reducer;