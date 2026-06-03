import { take, put, call, takeEvery } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import { COUNTDOWN_START } from "../../constants";
import { countdownTick, countdownEnd } from "./actions";

// eventChannel：將外部事件（setInterval、WebSocket、DOM events）橋接進 Saga
// emit(value) 傳送事件，emit(END) 關閉 channel
function createCountdownChannel(from) {
  return eventChannel((emit) => {
    let count = from;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        emit(count);
      } else {
        emit(END); // 傳送 END 代表 channel 結束
      }
    }, 1000);

    // 回傳的函式在 channel 關閉時執行（cleanup）
    return () => clearInterval(interval);
  });
}

function* runCountdown({ payload: { from } }) {
  // call() 建立 channel（同步）
  const channel = yield call(createCountdownChannel, from);

  try {
    while (true) {
      // take(channel)：從 channel 接收下一個值；遇到 END 時自動拋出
      const value = yield take(channel);
      yield put(countdownTick(value));
    }
  } finally {
    // channel 結束（END）或被取消時到這裡
    yield put(countdownEnd());
  }
}

export function* watchChannel() {
  yield takeEvery(COUNTDOWN_START, runCountdown);
}
