import { IDataResponse } from "@common/interface/IAxiosResponse";
import { getFacetsSuccess } from "@redux/slices/product";
import { getAllUserSuccess } from "@redux/slices/user";
import fetchUser from "@services/user";
import { call, put } from "redux-saga/effects";

export function* getAllUserSaga(action: any) {
  const { payload } = action;

  const response: IDataResponse = yield call(fetchUser.getAll, payload);

  const { data } = response;

  yield put(getAllUserSuccess(data));
}
