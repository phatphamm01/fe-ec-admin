import { IDataResponse } from "@common/interface/IAxiosResponse";
import {
  getAllOfUserSuccess,
  getAllPassbooksSuccess,
} from "@redux/slices/passbook";
import fetchPassBook from "@services/passbook";
import { call, put } from "redux-saga/effects";

export function* getAllPassbooksSaga(action: any) {
  const { payload } = action;

  const response: IDataResponse = yield call(
    fetchPassBook.getAllPassbooks,
    payload
  );

  const data = response;

  yield put(getAllPassbooksSuccess(data));
}

export function* getAllOfUserSaga(action: any) {
  const { payload } = action;

  const response: IDataResponse = yield call(
    fetchPassBook.getAllOfUser,
    payload
  );

  const data = response;

  yield put(getAllOfUserSuccess(data));
}
