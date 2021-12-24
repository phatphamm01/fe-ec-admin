import { getAllOption, getOptionsByTime } from "@redux/slices/option";
import { all, takeLatest } from "redux-saga/effects";
import { getCurrentOptionsSaga, getOptionsByTimeSaga } from "./option";

export default function* optionSaga() {
  yield all([takeLatest(getAllOption.type, getCurrentOptionsSaga)]);
  yield all([takeLatest(getOptionsByTime.type, getOptionsByTimeSaga)]);
}
