import { IUser } from "@redux/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  auth: IUser;
}

const initialState: IUserSlice = {
  auth: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuth() {},
    getAuthSuccess(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { getAuth, getAuthSuccess } = authSlice.actions;

const authReducers = authSlice.reducer;
export default authReducers;
