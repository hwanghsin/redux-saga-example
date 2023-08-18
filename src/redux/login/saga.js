import { put, takeEvery } from "redux-saga/effects";
import { LOGIN } from "../constants";
import { loginSuccess } from "./actions";

function* loginApi({ payload: { usr, pwd } }) {
  try {
    // generator函式，yield跟awaits有等待的功能
    const res = yield fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usr,
        password: pwd,
      }),
    });
    const json = yield res.json();
    if (json.token) {
      // put在saga裡跟react hook的dispatch一樣
      yield put(loginSuccess());
    }
  } catch (error) {
    alert(error.message);
  }
}

// 監聽函式
export function* watchLogin() {
  yield takeEvery(LOGIN, loginApi);
}
