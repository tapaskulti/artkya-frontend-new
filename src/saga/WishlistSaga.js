import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { setAllWishlist } from "../redux/app/wishlist/wishlistSlice";
import { getWishlistByIdAction } from "../api/wishlistAction";

export function* getWishlistByIdSaga(action) {
    try {  
      const response = yield call(getWishlistByIdAction, action.payload);
      console.log("getWishlistById res=>", response);
      if (response.status === 200) {
        yield put(setAllWishlist({wishlistDetails:response?.data?.data}))
      }      
    } catch (error) {
      console.log(error.message);
    }
  }

  export function* addArtToWishlistSaga(action) {
    try {        
    //  const response = yield call(addArtToCartSaga, action.payload);
      
    } catch (error) {
      console.log(error.message);
    }
  }


  export function* watchAsyncWishlistSaga() {
    
    yield takeEvery("GET_WISHLIST_BY_ID", getWishlistByIdSaga);
    yield takeEvery("ADD_ART_TO_WISHLIST", addArtToWishlistSaga)        
   
  }