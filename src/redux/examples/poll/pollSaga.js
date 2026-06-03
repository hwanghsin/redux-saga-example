import { call, put, take, fork, cancel, delay } from "redux-saga/effects";
import { POLL_START, POLL_STOP, API_BASE_URL } from "../../constants";
import { pollSuccess } from "./actions";

// 無限迴圈輪詢：每隔 3 秒請求一次
function* pollWorker() {
  while (true) {
    try {
      const res = yield call(fetch, `${API_BASE_URL}/products?limit=1&skip=${Math.floor(Math.random() * 100)}`);
      const json = yield call([res, res.json]);
      yield put(pollSuccess(json.products?.[0] || null));
    } catch (e) {
      // 輪詢期間的錯誤靜默忽略，繼續下一輪
    }
    yield delay(3000);
  }
}

// fork 啟動背景任務（非阻塞），take(POLL_STOP) 等待停止訊號後 cancel 掉任務
function* pollFlow() {
  while (true) {
    yield take(POLL_START);
    // fork：非阻塞啟動，不會卡住這個 saga
    const task = yield fork(pollWorker);

    yield take(POLL_STOP);
    // cancel：傳入 task handle 來強制停止 forked saga
    yield cancel(task);
  }
}

export function* watchPoll() {
  yield fork(pollFlow);
}
