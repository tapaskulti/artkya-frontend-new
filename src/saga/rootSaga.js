import { all } from "redux-saga/effects";
import { watchAsyncAuthSaga } from "./authSaga";
import { watchAsyncArtSaga } from "./artSaga";



export function* rootSaga() {
  yield all([
    watchAsyncAuthSaga(),
    watchAsyncArtSaga(),
  ]);
}
