import { getDashboard } from "@redux/slices/dashboard";
import { all, takeLatest } from "redux-saga/effects";
import { getDashboardSaga } from "./dashboard";

export default function* dashboardSaga() {
  yield all([takeLatest(getDashboard.type, getDashboardSaga)]);
}
