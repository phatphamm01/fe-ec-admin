import { IDataResponse } from "@common/interface/IAxiosResponse";
import { getDashboardSuccess } from "@redux/slices/dashboard";
import fetchDashboard from "@services/dashboard/index";
import { call, put } from "redux-saga/effects";

export function* getDashboardSaga() {
  const response: IDataResponse = yield call(fetchDashboard.dashboard);

  const data = response;

  yield put(getDashboardSuccess(data));
}
