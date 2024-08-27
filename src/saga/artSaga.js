import { call, put, takeEvery } from "redux-saga/effects";
import {
  FiltersAction,
  createArtAction,
  createDraftAction,
  getAllArtAction,
  getArtByIdAction,
} from "../api/artAction";
import { toast } from "react-toastify";
import {
  setAllArt,
  setAllFilteredArt,
  setArtDetails,
  setFilteredIsLoading,
  setIsLoading,
  setIsUploading,
} from "../redux/app/art/artSlice";


export function* createPostSaga(action) {
  try {
    yield put(
      setIsUploading({
        isuploading: true,
      })
    );
    console.log(action.payload, "action payload");
    const response = yield call(createArtAction, action.payload);
    if (response?.status === 200) {
      yield put(
        setIsUploading({
          isuploading: false,
        })
      );
      yield put({
        type: "ALL_ART",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createDraftSaga(action) {
  try {
    yield put(
      setIsUploading({
        isuploading: true,
      })
    );
    console.log(action.payload, "action payload");
    const response = yield call(createDraftAction, action.payload);
    if (response.status === 200) {
      yield put(
        setIsUploading({
          isuploading: false,
        })
      );
      yield put({
        type: "ALL_ART",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* filterArtSaga(action) {
  yield put(
    setFilteredIsLoading({
      isFilteredDataLoading: true,
    })
  );
  // console.log("filterArtSaga=============>",action.payload)
  try {
    const response = yield call(FiltersAction, action.payload);
    if (response?.status === 200) {
      yield put(
        setFilteredIsLoading({
          isuploading: false,
        })
      );
      yield put(setAllFilteredArt({ filteredArt: response?.data?.data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getAllArtSaga(action) {
  try {
    yield put(
      setIsLoading({
        isLoading: true,
      })
    );
    const response = yield call(getAllArtAction, action.payload);

    console.log("response from art saga", response?.data?.data);
    if (response?.status === 200) {
      yield put(
        setIsLoading({
          isLoading: false,
        })
      );
      yield put(setAllArt({ allArt: response?.data?.data }));
    }
  } catch (error) {
    toast.warning(error.message);
  }
}


export function* getArtDetailSaga(action) {
  try {
    yield put(
      setIsLoading({
        isLoading: true,
      })
    );
    const response = yield call(getArtByIdAction, action.payload);

    if (response.status === 200) {
      console.log("getArtDetailSaga====>", response);
      yield put(
        setArtDetails({
          artDetail: response?.data?.data,
        })
      );
      yield put(
        setIsLoading({
          isLoading: false,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* newFilterArtSaga(action) {
  yield put(
    setFilteredIsLoading({
      isFilteredDataLoading: true,
    })
  )
  try {
    const response = yield call(FiltersAction, action.payload);
    if (response?.status === 200) {
      yield put(
        setFilteredIsLoading({
          isuploading: false,
        })
      );
      yield put(setAllFilteredArt({ filteredArt: response?.data?.data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAsyncArtSaga() {
  yield takeEvery("CREATE_POST", createPostSaga);
  yield takeEvery("CREATE_DRAFT", createDraftSaga);
  yield takeEvery("FILTER_ART", filterArtSaga);
  yield takeEvery("NEW_FILTER_ART", newFilterArtSaga);
  yield takeEvery("ALL_ART", getAllArtSaga);
  yield takeEvery("ART_DETAIL", getArtDetailSaga);
}
