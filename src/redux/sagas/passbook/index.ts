import { getAllOfUser, getAllPassbooks } from "@redux/slices/passbook";
import { all, takeLatest } from "redux-saga/effects";
import { getAllOfUserSaga, getAllPassbooksSaga } from "./passbook";

export default function* passbookSaga() {
  yield all([
    takeLatest(getAllPassbooks.type, getAllPassbooksSaga),
    takeLatest(getAllOfUser.type, getAllOfUserSaga),
  ]);
}
