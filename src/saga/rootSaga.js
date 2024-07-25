import { all } from "redux-saga/effects";
import { watchAsyncAuthSaga } from "./authSaga";
import { watchAsyncArtSaga } from "./artSaga";
import { watchAsyncCartSaga } from "./CartSaga";
import { watchAsyncWishlistSaga } from "./WishlistSaga";
import { watchAsyncArtistSaga } from "./artistSaga";



export function* rootSaga() {
  yield all([
    watchAsyncAuthSaga(),
    watchAsyncArtSaga(),
    watchAsyncCartSaga(),
    watchAsyncWishlistSaga(),
    watchAsyncArtistSaga()
  ]);
}
