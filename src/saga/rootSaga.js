import { all } from "redux-saga/effects";
import { watchAsyncAuthSaga } from "./authSaga";

export function* rootSaga() {
  yield all([
    watchAsyncAuthSaga(),
  ]);
}
