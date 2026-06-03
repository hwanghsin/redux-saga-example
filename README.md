# Redux Saga 學習筆記

這是一個以「筆記型學習」為概念的 React + Redux Saga 示範專案。  
從基礎的登入流程開始，逐步擴充到 5 種常見的 Saga 模式，  
每個範例都附有詳細中文註解與對應的 UI 頁面可互動操作。

---

## 技術棧

| 套件 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| Redux | 4 | 狀態管理 |
| redux-saga | 1.2 | 非同步副作用處理 |
| react-redux | 8 | React 與 Redux 橋接 |
| react-router-dom | 6 | 客戶端路由 |

---

## 安裝與設定

### 前置需求
- Node.js 16+
- npm 7+

### 步驟

```bash
# 1. Clone 專案
git clone <repo-url>
cd redux-saga-example

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm start
```

瀏覽器會自動開啟 `http://localhost:3000`。

### 測試帳號

本專案使用 [DummyJSON](https://dummyjson.com) 模擬 API，可使用以下帳密登入：

| 帳號 | 密碼 |
|------|------|
| `emilys` | `emilyspass` |

---

## 使用方式

### 1. 登入頁面（`/login`）
- 輸入帳號密碼後點送出
- 登入成功 → 自動跳轉首頁
- 登入失敗 → 頁面顯示紅字錯誤訊息（不再跳 alert）
- 欄位空白不送出（前端 validation）

### 2. 首頁（`/`）
- 需要登入才能進入（受保護路由）
- 包含 Switch Toggle 元件示範
- 列出所有 Saga 範例的連結

### 3. Saga 範例頁面

| 路徑 | 模式 | 核心效果 |
|------|------|---------|
| `/examples/search` | 搜尋防抖 | `takeLatest`, `delay` |
| `/examples/race` | 競賽 | `race`, `delay` |
| `/examples/polling` | 輪詢 | `fork`, `cancel`, `delay` |
| `/examples/fork-cancel` | 背景任務 | `fork`, `cancel`, `cancelled` |
| `/examples/channel` | 事件橋接 | `eventChannel`, `END`, `take` |

---

## 專案結構

```
redux-saga-example/
├── public/
│   └── manifest.json
└── src/
    ├── App.js                          # 路由設定（BrowserRouter）
    ├── index.js                        # React 入口，掛載 Provider
    ├── components/
    │   ├── Home/
    │   │   └── index.js               # 首頁（受保護路由）
    │   ├── Login/
    │   │   └── index.js               # 登入表單（含 error 顯示）
    │   ├── Switch/
    │   │   ├── index.js               # Toggle，同時示範 Hooks 與 connect()
    │   │   └── switch.css             # 自製 CSS Toggle 樣式
    │   └── examples/
    │       ├── Search/index.js        # 搜尋防抖 Demo
    │       ├── Race/index.js          # 競賽 Demo
    │       ├── Polling/index.js       # 輪詢 Demo
    │       ├── ForkCancel/index.js    # 背景任務取消 Demo
    │       └── Channel/index.js       # 事件橋接 Demo
    └── redux/
        ├── constants.js               # 所有 action type 常數
        ├── store.js                   # Store 設定，合併 reducer 與 saga
        ├── login/
        │   ├── actions.js             # Login action creators
        │   ├── reducer.js             # Login 狀態管理
        │   └── saga.js               # 登入非同步邏輯（takeEvery, call, put）
        ├── switch/
        │   ├── actions.js             # Switch action creator
        │   └── reducer.js             # Switch 狀態（isTurnOn）
        └── examples/
            ├── search/
            │   ├── actions.js
            │   ├── reducer.js
            │   └── searchSaga.js      # takeLatest + delay
            ├── race/
            │   ├── actions.js
            │   ├── reducer.js
            │   └── raceSaga.js        # race()
            ├── poll/
            │   ├── actions.js
            │   ├── reducer.js
            │   └── pollSaga.js        # fork + cancel + 無限迴圈
            ├── forkCancel/
            │   ├── actions.js
            │   ├── reducer.js
            │   └── forkCancelSaga.js  # fork + cancel + cancelled()
            └── channel/
                ├── actions.js
                ├── reducer.js
                └── channelSaga.js     # eventChannel + END
```

---

## Redux Saga 效果一覽

| Effect | 所在檔案 | 用途 |
|--------|---------|------|
| `takeEvery` | `login/saga.js` | 監聽每一次 LOGIN action |
| `takeLatest` | `search/searchSaga.js` | 只保留最新請求，自動取消前一個 |
| `put` | 所有 saga | 相當於 dispatch，更新 Redux 狀態 |
| `call` | `login/saga.js`, 各範例 | 正確包裝 Promise 以利測試與追蹤 |
| `delay` | `search/searchSaga.js`, `race/raceSaga.js` | 等待指定時間（防抖、timeout） |
| `race` | `race/raceSaga.js` | 多個 effect 競賽，第一個完成者勝出 |
| `fork` | `poll/pollSaga.js`, `forkCancel/` | 非阻塞啟動背景任務，回傳 task handle |
| `cancel` | `poll/pollSaga.js`, `forkCancel/` | 傳入 task handle 強制停止任務 |
| `cancelled` | `forkCancel/forkCancelSaga.js` | 在 finally 偵測是否被取消（做清理） |
| `take` | `poll/pollSaga.js`, `channel/channelSaga.js` | 等待特定 action 或 channel 訊號 |
| `eventChannel` | `channel/channelSaga.js` | 橋接外部事件（setInterval 等）進 Saga |
| `all` | `store.js` | 同時啟動多個 watcher saga |

---

## 各模式詳解

### 1. takeEvery（基礎監聽）
> 位置：`src/redux/login/saga.js`

每次觸發 `LOGIN` action 都執行一次 `loginApi`，允許並發。

```js
// 監聽每一個 LOGIN action，都觸發 loginApi
export function* watchLogin() {
  yield takeEvery(LOGIN, loginApi);
}
```

---

### 2. takeLatest + delay（搜尋防抖）
> 位置：`src/redux/examples/search/searchSaga.js`

當新的 `SEARCH_REQUEST` 進來，自動取消上一個還在執行中的 saga；  
`delay(300)` 讓使用者停止輸入 300ms 後才發請求。

```js
function* doSearch({ payload: { query } }) {
  yield delay(300);  // 防抖

  const res = yield call(fetch, `${API_BASE_URL}/products/search?q=${query}`);
  const json = yield call([res, res.json]);
  yield put(searchSuccess(json.products));
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, doSearch);  // 自動取消前一個
}
```

---

### 3. race()（競賽 / 超時保護）
> 位置：`src/redux/examples/race/raceSaga.js`

同時啟動 API 請求與 3 秒 timeout，誰先完成就用誰，另一個自動取消。

```js
function* doRaceFetch() {
  const { response, timeout } = yield race({
    response: call(fetch, `${API_BASE_URL}/products/1`),
    timeout: delay(3000),
  });

  if (timeout) {
    yield put(raceFetchTimeout());
  } else {
    const json = yield call([response, response.json]);
    yield put(raceFetchSuccess(json));
  }
}
```

---

### 4. Polling（定時輪詢）
> 位置：`src/redux/examples/poll/pollSaga.js`

`fork` 非阻塞啟動無限迴圈，`take(POLL_STOP)` 等到停止訊號後 `cancel` 掉任務。

```js
function* pollWorker() {
  while (true) {
    const res = yield call(fetch, `${API_BASE_URL}/products?limit=1`);
    const json = yield call([res, res.json]);
    yield put(pollSuccess(json.products[0]));
    yield delay(3000);
  }
}

function* pollFlow() {
  while (true) {
    yield take(POLL_START);
    const task = yield fork(pollWorker);  // 非阻塞啟動

    yield take(POLL_STOP);
    yield cancel(task);  // 強制停止
  }
}
```

---

### 5. fork / cancel / cancelled()（背景任務取消）
> 位置：`src/redux/examples/forkCancel/forkCancelSaga.js`

`cancelled()` 在 `finally` 區塊可偵測任務是否被取消，適合做資源清理。

```js
function* counterWorker() {
  try {
    while (true) {
      yield delay(1000);
      yield put(counterTick());
    }
  } finally {
    if (yield cancelled()) {
      // 被 cancel() 時才進這裡，可清除 timer 或關閉連線
      yield put(counterStop());
    }
  }
}
```

---

### 6. eventChannel（外部事件橋接）
> 位置：`src/redux/examples/channel/channelSaga.js`

將 `setInterval`、WebSocket 等非 Redux 事件源橋接進 Saga，  
用 `emit(value)` 傳資料，`emit(END)` 關閉 channel 並觸發清理。

```js
function createCountdownChannel(from) {
  return eventChannel((emit) => {
    let count = from;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        emit(count);          // 傳送倒數值
      } else {
        emit(END);            // 結束 channel
      }
    }, 1000);

    return () => clearInterval(interval);  // cleanup
  });
}

function* runCountdown({ payload: { from } }) {
  const channel = yield call(createCountdownChannel, from);
  try {
    while (true) {
      const value = yield take(channel);  // 從 channel 接收
      yield put(countdownTick(value));
    }
  } finally {
    yield put(countdownEnd());
  }
}
```

---

## Switch 元件：兩種 Redux 連接方式對照

> 位置：`src/components/Switch/index.js`

```js
// 方式一：Hooks（現代推薦寫法）
export const SwitchWithHooks = () => {
  const dispatch = useDispatch();
  const isOn = useSelector((state) => state.Switch.isTurnOn);
  return <div onClick={() => dispatch(toggleSwitch())}>...</div>;
};

// 方式二：connect() HOC（舊版 / class component 用）
const Switch = ({ switchState, toggleSwitch }) => { ... };
export default connect(mapStateToProps, mapDispatchToProps)(Switch);
```

---

## 程式碼優化說明

| # | 問題 | 修改 | 原因 |
|---|------|------|------|
| 1 | 直接 `yield fetch(...)` | 改為 `yield call(fetch, ...)` | `call()` 讓 saga devtools 能追蹤，也讓測試可以攔截 |
| 2 | `yield res.json()` | 改為 `yield call([res, res.json])` | Promise 需用 `call()` 包裝才能被 saga 正確處理 |
| 3 | `window.location = "/"` | 移到 Login component 用 `useEffect` 監聽 `isLoggedIn` | 副作用不應在 saga 直接操作 DOM，保持關注點分離 |
| 4 | `alert(error.message)` | 改為 `yield put(loginFailure(error))` | 錯誤應進 Redux store，由 UI 決定如何顯示 |
| 5 | Reducer 沒有 `error` 欄位 | 新增 `error`、`isLoggedIn`、`LOGIN_FAILURE` case | 完整的錯誤狀態讓 UI 可以顯示錯誤訊息 |
| 6 | 預設帳密寫死在 reducer | 移除，初始值改為空字串 | 測試帳密不應存在 production 程式碼 |
| 7 | 送出前無 validation | 加入 `!usr.trim() \|\| !pwd.trim()` 檢查 | 避免發送空白請求 |
| 8 | API URL 分散 | 集中至 `constants.js` 的 `API_BASE_URL` | 單一來源，方便未來切換 API endpoint |

---

## 補充資源

- [Redux Saga 官方文件](https://redux-saga.js.org/)
- [Redux Saga Effects API](https://redux-saga.js.org/docs/api/)
- [DummyJSON（模擬 API）](https://dummyjson.com)
- [Redux Toolkit（官方建議的現代 Redux 寫法）](https://redux-toolkit.js.org/)
