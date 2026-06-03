// 登入相關
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

// Switch
export const TOGGLE_SWITCH = "TOGGLE_SWITCH";

// 通用
export const API_FINISHED = "API_FINISHED";
export const API_BASE_URL = "https://dummyjson.com";

// 範例：takeLatest + delay（搜尋防抖）
export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

// 範例：race()（競賽）
export const RACE_FETCH_REQUEST = "RACE_FETCH_REQUEST";
export const RACE_FETCH_SUCCESS = "RACE_FETCH_SUCCESS";
export const RACE_FETCH_TIMEOUT = "RACE_FETCH_TIMEOUT";

// 範例：Polling（輪詢）
export const POLL_START = "POLL_START";
export const POLL_STOP = "POLL_STOP";
export const POLL_SUCCESS = "POLL_SUCCESS";

// 範例：fork / cancel（背景任務）
export const COUNTER_START = "COUNTER_START";
export const COUNTER_STOP = "COUNTER_STOP";
export const COUNTER_TICK = "COUNTER_TICK";

// 範例：eventChannel（事件橋接）
export const COUNTDOWN_START = "COUNTDOWN_START";
export const COUNTDOWN_TICK = "COUNTDOWN_TICK";
export const COUNTDOWN_END = "COUNTDOWN_END";
