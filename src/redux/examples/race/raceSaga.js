import { call, put, race, delay, takeEvery } from "redux-saga/effects";
import { RACE_FETCH_REQUEST, API_BASE_URL } from "../../constants";
import { raceFetchSuccess, raceFetchTimeout } from "./actions";

// race()：同時啟動多個 effect，第一個完成的勝出，其餘自動取消
// 常見用途：API 超時保護、同時發兩個請求取快的那個
function* doRaceFetch() {
  const { response, timeout } = yield race({
    response: call(fetch, `${API_BASE_URL}/products/1`),
    // 3 秒內若 API 未回應，timeout 會先完成
    timeout: delay(3000),
  });

  if (timeout) {
    yield put(raceFetchTimeout());
  } else {
    const json = yield call([response, response.json]);
    yield put(raceFetchSuccess(json));
  }
}

export function* watchRace() {
  yield takeEvery(RACE_FETCH_REQUEST, doRaceFetch);
}
