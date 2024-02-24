import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  addToCartAction,
  createCartAction,
  getCartByIdAction,
  removeFromCartAction,
} from "../api/cartAction";
import { setAllCart } from "../redux/app/cart/cartSlice";

export function* createCartByIdSaga(action) {
  try {
    const response = yield call(createCartAction, action.payload);
   
  } catch (error) {
    console.log(error.message);
  }
}

export function* getCartByIdSaga(action) {
  try {
    const response = yield call(getCartByIdAction, action.payload);
    console.log("getCartByIdSaga res=>", response);
    if (response.status === 200) {
      yield put(setAllCart({ cartDetails: response?.data?.data }));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* addArtToCartSaga(action) {
  try {
    const response = yield call(addToCartAction, action.payload);
    if (response.status === 200) {
      // action.payload.navigate("/Cart");
      toast.success("Added To Cart")
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* removeArtFromCartSaga(action) {
  try {
    console.log(action.payload);
    const response = yield call(removeFromCartAction, action.payload);
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchAsyncCartSaga() {
  yield takeEvery("CREATE_CART_BY_ID", createCartByIdSaga);
  yield takeEvery("GET_CART_BY_ID", getCartByIdSaga);
  yield takeEvery("ADD_ART_TO_CART", addArtToCartSaga);
  yield takeEvery("REMOVE_ART_FROM_CART", removeArtFromCartSaga);
}
