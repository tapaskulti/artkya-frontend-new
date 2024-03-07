import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { setAllWishlist } from "../redux/app/wishlist/wishlistSlice";
import {
  addToWishlistAction,
  createWishlistAction,
  getWishlistByIdAction,
  removeFromWishlistAction,
} from "../api/wishlistAction";

export function* createWishlistByIdSaga(action) {
  try {
    const response = yield call(createWishlistAction, action.payload);
  } catch (error) {
    console.log(error.message);
  }
}

export function* getWishlistByIdSaga(action) {
  try {
    const response = yield call(getWishlistByIdAction, action.payload);
    console.log("getWishlistById res=>", response);
    if (response.status === 200) {
      yield put(setAllWishlist({ wishlistDetails: response?.data?.data }));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* addArtToWishlistSaga(action) {
  try {
    const response = yield call(addToWishlistAction, action.payload);
    if (response.status === 200) {
      toast.success("Added To Wishlist");
    }
  } catch (error) {
    console.log("error ===>", error);
    if (error.response.data.message === "Art Already Present In Wishlist") {
      yield put({
        type: "REMOVE_ART_FROM_WISHLIST",
        payload: {
          userId: action.payload?.userId,
          artId: action.payload?.artId,
        },
      });
    }
  }
}

export function* removeArtFromWishlistSaga(action) {
  try {
    console.log("Action removeArtFromWishlistSaga---->", action.payload);
    const response = yield call(removeFromWishlistAction, action.payload);
    if (response.status === 200) {
      yield put({
        type: "GET_WISHLIST_BY_ID",
        payload: action.payload?.userId,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchAsyncWishlistSaga() {
  yield takeEvery("CREATE_WISHLIST_BY_ID", createWishlistByIdSaga);
  yield takeEvery("GET_WISHLIST_BY_ID", getWishlistByIdSaga);
  yield takeEvery("ADD_ART_TO_WISHLIST", addArtToWishlistSaga);
  yield takeEvery("REMOVE_ART_FROM_WISHLIST", removeArtFromWishlistSaga);
}
