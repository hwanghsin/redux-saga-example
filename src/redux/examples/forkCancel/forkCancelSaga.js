import { put, take, fork, cancel, delay, cancelled } from "redux-saga/effects";
import { COUNTER_START, COUNTER_STOP } from "../../constants";
import { counterTick, counterStop } from "./actions";

// cancelled()：當這個 saga 被 cancel() 時，finally 區塊可用 cancelled() 偵測
// 適合做清理工作（清除 timer、關閉連線等）
function* counterWorker() {
  try {
    while (true) {
      yield delay(1000);
      yield put(counterTick());
    }
  } finally {
    // 被 cancel() 時執行，可在此做清理
    if (yield cancelled()) {
      yield put(counterStop());
    }
  }
}

function* counterFlow() {
  while (true) {
    yield take(COUNTER_START);
    const task = yield fork(counterWorker);

    yield take(COUNTER_STOP);
    yield cancel(task);
  }
}

export function* watchForkCancel() {
  yield fork(counterFlow);
}
