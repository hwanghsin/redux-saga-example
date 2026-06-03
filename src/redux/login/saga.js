import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN, API_BASE_URL } from "../constants";
import { loginSuccess, loginFailure } from "./actions";

// call() 讓 saga 正確包裝 Promise，方便測試與 devtools 追蹤
function* loginApi({ payload: { usr, pwd } }) {
  try {
    const res = yield call(fetch, `${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usr, password: pwd }),
    });
    const json = yield call([res, res.json]);

    if (json.accessToken) {
      localStorage.setItem("login", JSON.stringify(json));
      // put 相當於 dispatch，通知 reducer 更新狀態
      yield put(loginSuccess());
      // 導航由 Login component 監聽 isLoggedIn 狀態後執行，不在 saga 裡操作 window
    } else {
      yield put(loginFailure(json.message || "登入失敗"));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// takeEvery 監聽每一個 LOGIN action，都觸發 loginApi
export function* watchLogin() {
  yield takeEvery(LOGIN, loginApi);
}
