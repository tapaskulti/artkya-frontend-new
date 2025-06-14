import { toast } from "react-toastify";
import { call, takeEvery } from "redux-saga/effects";
import { createOrderAction } from "../api/orderAction";

export function* createOrderByIdSaga(action) {
  try {
    const response = yield call(createOrderAction, action.payload);
    if (response.status === 200) {
      toast("Order created Successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchAsyncOrderSaga() {
  yield takeEvery("CREATE_ORDER_BY_ID", createOrderByIdSaga);
}
