import { toast } from "react-toastify";
import { call, takeEvery } from "redux-saga/effects";
import { getCartByIdAction } from "../api/cartActions";

export function* getCartByIdSaga(action) {
    try {        
     const response = yield call(getCartByIdAction, action.payload);
      
    } catch (error) {
      toast.warning(error.message);
    }
  }


  export function* addArtToCartSaga(action) {
    try {        
     const response = yield call(getCartByIdAction, action.payload)
      
    } catch (error) {
      toast.warning(error.message);
    }
  }





  

  
  export function* watchAsyncCartSaga() {    
    yield takeEvery("GET_CART_BY_ID", getCartByIdSaga)
    yield takeEvery("ADD_ART_TO_CART", addArtToCartSaga)      
  }