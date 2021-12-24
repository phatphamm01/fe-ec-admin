import { IDataResponse } from "@common/interface/IAxiosResponse";
import {
  getAllOptionSuccess,
  getOptionsByTimeSuccess,
} from "@redux/slices/option";
import fetchOption from "@services/option/index";
import { message } from "antd";
import { call, put } from "redux-saga/effects";

export function* getCurrentOptionsSaga(action: any) {
  const { payload } = action;

  const response: IDataResponse = yield call(
    fetchOption.getCurrentOptions,
    payload
  );

  const data = response;

  yield put(getAllOptionSuccess(data));
}

export function* getOptionsByTimeSaga(action: any) {
  try {
    const { payload } = action;
    const response: IDataResponse = yield call(
      fetchOption.getOptionsByTime,
      payload
    );

    if (response.success === false) {
      message.error(response.message);
      return;
    }

    const data = response;

    yield put(getOptionsByTimeSuccess(data));
  } catch (error: any) {
    console.log(error);
  }
}
