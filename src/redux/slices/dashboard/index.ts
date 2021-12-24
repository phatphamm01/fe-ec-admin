import { createSlice } from "@reduxjs/toolkit";

interface IDashdoardSlice {
  dashboard: any;
}

const initialState: IDashdoardSlice = {
  dashboard: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboard() {},
    getDashboardSuccess(state, action) {
      state.dashboard = action.payload;
    },
  },
});

export const { getDashboard, getDashboardSuccess } = dashboardSlice.actions;

const dashboardReducers = dashboardSlice.reducer;
export default dashboardReducers;
