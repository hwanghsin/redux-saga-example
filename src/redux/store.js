import { createStore, applyMiddleware, combineReducers } from "redux";
import createMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
// reducers
import Login from "./login/reducer";
import Switch from "./switch/reducer";
// sagas
import { watchLogin } from "./login/saga";

const reducers = combineReducers({
  Login,
  Switch,
});

// Saga執行的時候都使用generator函式
const sagas = function* rootSaga() {
  yield all([watchLogin()]);
};

// 建立saga的middleware
const sagaMiddleware = createMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  // createStore已停用
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  // 監聽saga，符合代碼的saga就會執行函式
  sagaMiddleware.run(sagas);

  return store;
}
