import { createSlice } from "@reduxjs/toolkit";

export interface IThemeSlice {
  navCollapsed: boolean;
}

const initialState: IThemeSlice = {
  navCollapsed: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setStateNav: (state, action: { payload: boolean }) => {
      state.navCollapsed = action.payload;
    },
  },
});

export const { setStateNav } = themeSlice.actions;

const themeReducers = themeSlice.reducer;
export default themeReducers;
