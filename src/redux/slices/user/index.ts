import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@redux/types/user";

interface IUserSlice {
  user: IUser;
  allUser: any;
}

const initialState: IUserSlice = {
  user: {},
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser() {},
    getUserSuccess(state, action) {
      state.user = action.payload;
    },

    getAllUser() {},
    getAllUserSuccess(state, action) {
      state.allUser = action.payload;
    },
  },
});

export const { getUser, getUserSuccess, getAllUser, getAllUserSuccess } =
  userSlice.actions;

const userReducers = userSlice.reducer;
export default userReducers;
