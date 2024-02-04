import { toast } from "react-toastify";
import { call, takeEvery } from "redux-saga/effects";

export function* getWishlistByIdSaga(action) {
    try {
  
      
      
    } catch (error) {
      toast.warning(error.message);
    }
  }

  export function* addArtToWishlistSaga(action) {
    try {        
    //  const response = yield call(addArtToCartSaga, action.payload);
      
    } catch (error) {
      toast.warning(error.message);
    }
  }


  export function* watchAsyncWishlistSaga() {
    
    yield takeEvery("GET_WISHLIST_BY_ID", getWishlistByIdSaga);
    yield takeEvery("ADD_ART_TO_WISHLIST", addArtToCartSaga)        
   
  }