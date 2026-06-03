import { createStore, applyMiddleware, combineReducers } from "redux";
import createMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

// reducers
import Login from "./login/reducer";
import Switch from "./switch/reducer";
import Search from "./examples/search/reducer";
import Race from "./examples/race/reducer";
import Poll from "./examples/poll/reducer";
import ForkCancel from "./examples/forkCancel/reducer";
import Channel from "./examples/channel/reducer";

// sagas
import { watchLogin } from "./login/saga";
import { watchSearch } from "./examples/search/searchSaga";
import { watchRace } from "./examples/race/raceSaga";
import { watchPoll } from "./examples/poll/pollSaga";
import { watchForkCancel } from "./examples/forkCancel/forkCancelSaga";
import { watchChannel } from "./examples/channel/channelSaga";

const reducers = combineReducers({
  Login,
  Switch,
  Search,
  Race,
  Poll,
  ForkCancel,
  Channel,
});

// all() 同時啟動多個 watcher saga
// createStore 已停用，官方建議改用 @reduxjs/toolkit 的 configureStore
// 此處保留 createStore 供學習對照
const sagas = function* rootSaga() {
  yield all([
    watchLogin(),
    watchSearch(),
    watchRace(),
    watchPoll(),
    watchForkCancel(),
    watchChannel(),
  ]);
};

const sagaMiddleware = createMiddleware();

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(sagas);
  return store;
}
