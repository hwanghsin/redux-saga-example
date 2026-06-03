import { call, put, takeLatest, delay } from "redux-saga/effects";
import { SEARCH_REQUEST, API_BASE_URL } from "../../constants";
import { searchSuccess, searchFailure } from "./actions";

// takeLatest：當新的 SEARCH_REQUEST 進來，會自動取消上一個還在執行中的 saga
// delay：等待 300ms 再發請求，避免每打一個字就呼叫 API（防抖 debounce）
function* doSearch({ payload: { query } }) {
  try {
    // 防抖：等待使用者停止輸入後才發請求
    yield delay(300);

    const res = yield call(fetch, `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    const json = yield call([res, res.json]);
    yield put(searchSuccess(json.products || []));
  } catch (error) {
    yield put(searchFailure(error.message));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, doSearch);
}
