import { IOption, IOptions } from "@redux/types/option";
import { createSlice } from "@reduxjs/toolkit";

interface IOptionSlice {
  option: IOption;
  allOption: IOptions[];
  allOptionByTime: IOptions[];
}

const initialState: IOptionSlice = {
  option: {},
  allOption: [],
  allOptionByTime: [],
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
      const handleData = action.payload.sort(
        (a: any, b: any) => a.option - b.option
      );
      state.allOption = handleData;
    },

    getOptionsByTime(state, action) {},
    getOptionsByTimeSuccess(state, action) {
      const handleData = action?.payload?.sort(
        (a: any, b: any) => a.option - b.option
      );
      state.allOptionByTime = handleData || [];
    },
  },
});

export const {
  getOption,
  getOptionSuccess,
  getAllOption,
  getAllOptionSuccess,
  getOptionsByTime,
  getOptionsByTimeSuccess,
} = optionSlice.actions;

const optionReducers = optionSlice.reducer;
export default optionReducers;
