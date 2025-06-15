import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { createOrderAction, getOrderByOrderIdAction, getOrderByUserIdAction } from "../api/orderAction";
import { setIsOrderLoading, setOrderError, setOrdersSuccess, updateOrder } from "../redux/app/order/orderSlice";

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

export function* fetchUserOrdersSaga(action) {
   console.log("fetchUserOrdersSaga action===>",action)
  try {
    yield put(setIsOrderLoading(true));
    const response = yield call(getOrderByUserIdAction, action.payload);
    console.log("fetchUserOrdersSaga===>",response)
    if (response.status === 200) {
      yield put(setOrdersSuccess({
        orders: response.data.data.orders,
        pagination: response.data.data.pagination,
        summary: response.data.data.summary
      }));
    } else {
      yield put(setOrderError(response.data.message || 'Failed to fetch orders'));
    }
  } catch (error) {
    console.log(error.message);
    yield put(setOrderError(error.message || 'Failed to fetch orders'));
  }
}

export function* fetchOrderByIdSaga(action) {
  try {
    yield put(setIsOrderLoading(true));
    const response = yield call(getOrderByOrderIdAction, action.payload);
    
    if (response.status === 200) {
      yield put(updateOrder(response.data.data.order));
      yield put(setIsOrderLoading(false));
    } else {
      yield put(setOrderError(response.data.message || 'Failed to fetch order details'));
    }
  } catch (error) {
    console.log(error.message);
    yield put(setOrderError(error.message || 'Failed to fetch order details'));
  }
}


export function* watchAsyncOrderSaga() {
  yield takeEvery("CREATE_ORDER_BY_ID", createOrderByIdSaga);
  yield takeEvery('FETCH_USER_ORDERS', fetchUserOrdersSaga);
  yield takeEvery('FETCH_ORDER_BY_ID', fetchOrderByIdSaga);
}
