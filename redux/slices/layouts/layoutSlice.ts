import { createSlice } from '@reduxjs/toolkit';
import { layoutStateType } from '../../../@types/redux/slices/layouts/layoutSlice';
import { HYDRATE } from "next-redux-wrapper";
const initialState: layoutStateType = {
   sidebarOpen: false,
   title:"Aran Ui"
}

const layoutSlice =  createSlice({
   name:"layout",
   initialState,
   reducers:{
      toggleSidebar: (state) => {
         return {
            ...state,
            sidebarOpen: !state.sidebarOpen
         }
      }
   },
   extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
})

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;

