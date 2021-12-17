import { combineReducers } from "@reduxjs/toolkit";
import billReducers from "./bill";
import commonReducers from "./common";
import dashboardReducers from "./dashboard";
import productReducers from "./product";
import themeReducers from "./theme";
import userReducers from "./user";

const rootReducers = combineReducers({
  themeReducers,
  commonReducers,
  productReducers,
  userReducers,
  billReducers,
  dashboardReducers,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
