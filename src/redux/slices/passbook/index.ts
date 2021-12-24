import { IPassbook } from "@redux/types/passbook";
import { createSlice } from "@reduxjs/toolkit";

interface IPassbookSlice {
  allPassbook: IPassbook[];
  passbookDetail: IPassbook;
  passbookUser: IPassbook[];
}

const initialState: IPassbookSlice = {
  passbookDetail: {},
  allPassbook: [],
  passbookUser: [],
};

const PassbookSlice = createSlice({
  name: "passbook",
  initialState,
  reducers: {
    getAllPassbooks() {},
    getAllPassbooksSuccess(state, action) {
      state.allPassbook = action.payload;
    },

    getAllOfUser(state, action: any) {},
    getAllOfUserSuccess(state, action) {
      state.passbookUser = action.payload;
    },

    getPassbookDetail() {},
    getPassbookDetailSuccess(state, action) {
      state.passbookDetail = action.payload;
    },
  },
});

export const {
  getAllPassbooks,
  getAllPassbooksSuccess,
  getAllOfUser,
  getAllOfUserSuccess,
  getPassbookDetail,
  getPassbookDetailSuccess,
} = PassbookSlice.actions;

const passbookReducers = PassbookSlice.reducer;
export default passbookReducers;
