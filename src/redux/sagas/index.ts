import { all } from "@redux-saga/core/effects";
import billsSaga from "./bill";
import commonSaga from "./common";
import dashboardsSaga from "./dashboard";
import productSaga from "./product";
import userSaga from "./user";

export default function* rootSagas() {
  yield all([
    productSaga(),
    commonSaga(),
    billsSaga(),
    dashboardsSaga(),
    userSaga(),
  ]);
}
