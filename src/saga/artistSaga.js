import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import { createArtistAction } from "../api/artistAction";


export function* createArtistSaga(action) {
    try {    
      console.log(action.payload, "action payload");
      const response = yield call(createArtistAction, action.payload);    
      console.log("createArtistSaga====>",response.data)
      if (response?.status === 200){
        toast("Artist created successfully")
      }
    } catch (error) {
      console.log(error);
    }
  }







  export function* watchAsyncArtistSaga() {
    yield takeEvery("CREATE_ARTIST", createArtistSaga);   
  }