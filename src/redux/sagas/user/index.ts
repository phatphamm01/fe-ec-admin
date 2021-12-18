import { getAllUser } from "@redux/slices/user";
import { all, takeLatest } from "redux-saga/effects";
import { getAllUserSaga } from "./user";

export default function* userSaga() {
  yield all([takeLatest(getAllUser.type, getAllUserSaga)]);
}
