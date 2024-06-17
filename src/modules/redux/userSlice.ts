import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type userState = {
  user: {
    uid: string;
    email: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  };
};

const userSlice = createSlice({
  name:"user",
  initialState:{} as userState | {},
  reducers:{
    addUser:(state, action: PayloadAction<userState["user"]>)=>{
      return action.payload
    },
    removeUser:(state,action)=>{
      return action
    }
  }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;