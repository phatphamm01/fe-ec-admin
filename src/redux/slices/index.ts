import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./auth";
import dashboardReducers from "./dashboard";
import optionReducers from "./option";
import passbookReducers from "./passbook";
import themeReducers from "./theme";
import userReducers from "./user";

const rootReducers = combineReducers({
  themeReducers,
  userReducers,
  passbookReducers,
  authReducers,
  optionReducers,
  dashboardReducers,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
