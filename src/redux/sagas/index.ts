import { all } from "@redux-saga/core/effects";
import dashboardSaga from "./dashboard";
import optionSaga from "./option";
import passbookSaga from "./passbook";
import userSaga from "./user";

export default function* rootSagas() {
  yield all([userSaga(), passbookSaga(), optionSaga(), dashboardSaga()]);
}
