import { Action, AnyAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserPageState } from "../../../../@types/redux/slices/admin/users-management/usersPage";

const initialState: UserPageState = {};
interface RejectedAction extends Action {
   error: Error;
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
   return action.type.endsWith("rejected");
}
const exampleSlices = createSlice({
   name: "usersPage",
   initialState,
   reducers: {},
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

export const exampleActions = exampleSlices.actions;
export default exampleSlices.reducer;
