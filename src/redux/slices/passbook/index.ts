import { createSlice } from "@reduxjs/toolkit";
import { IOption, IOptions } from "@redux/types/option";

interface IOptionSlice {
  option: IOption;
  allOption: IOptions;
}

const initialState: IOptionSlice = {
  option: {},
  allOption: [],
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    getOption() {},
    getOptionSuccess(state, action) {
      state.option = action.payload;
    },

    getAllOption() {},
    getAllOptionSuccess(state, action) {
      state.allOption = action.payload;
    },
  },
});

export const {
  getOption,
  getOptionSuccess,
  getAllOption,
  getAllOptionSuccess,
} = optionSlice.actions;

const optionReducers = optionSlice.reducer;
export default optionReducers;
