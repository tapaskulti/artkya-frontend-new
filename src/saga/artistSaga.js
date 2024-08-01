import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  createArtistAction,
  getAllArtByArtistAction,
  getArtistProfileByIdAction,
  updateArtistImagesAction,
  updateArtistProfileAction,
} from "../api/artistAction";
import {
  setArtistDetails,
  setArtistImageUploadLoading,
  setGetAllArtByArtistSaga,
} from "../redux/app/artist/artist-slice";

export function* createArtistSaga(action) {
  try {
    console.log(action.payload, "action payload");
    const response = yield call(createArtistAction, action?.payload);
    console.log("createArtistSaga====>", response?.data);
    if (response?.status === 200) {
      toast("Artist created successfully");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateArtistProfileSaga(action) {
  try {
    console.log(action.payload, "action payload");
    const response = yield call(updateArtistProfileAction, action?.payload);
    console.log("updateArtistProfileSaga====>", response?.data);
    if (response?.status === 200) {
      toast("Profile Updated successfully");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateArtistImageSaga(action) {
  try {
    yield put(setArtistImageUploadLoading({ artistImageUploadLoading: true }));
    console.log(action.payload, "action payload");
    const response = yield call(updateArtistImagesAction, action.payload);
    console.log("updateArtistImageSaga====>", response?.data);
    if (response?.status === 200) {
      toast("Image Updated successfully");
      yield put(
        setArtistImageUploadLoading({ artistImageUploadLoading: false })
      );
      yield put({
        type: "GET_ARTIST_PROFILE_BY_ID",
        payload: {
          artistId: action.payload?.artistId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getArtistProfileByIdSaga(action) {
  try {
    const response = yield call(getArtistProfileByIdAction, action.payload);
    console.log("getArtistProfileByIdSaga====>", response?.data);
    if (response?.status === 200) {
      yield put(setArtistDetails({ artistDetails: response?.data?.data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getAllArtByArtistSaga(action) {
  try {
    const response = yield call(getAllArtByArtistAction, action.payload);
    console.log("getAllArtByArtistSaga====>", response?.data);
    if (response?.status === 200) {
      yield put(setGetAllArtByArtistSaga({ getAllArtByArtistSaga: response?.data?.data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAsyncArtistSaga() {
  yield takeEvery("CREATE_ARTIST", createArtistSaga);
  yield takeEvery("UPDATE_ARTIST_PROFILE", updateArtistProfileSaga);
  yield takeEvery("UPDATE_ARTIST_IMAGE", updateArtistImageSaga);
  yield takeEvery("GET_ARTIST_PROFILE_BY_ID", getArtistProfileByIdSaga);
  yield takeEvery("GET_ALL_ART_BY_ARTIST", getAllArtByArtistSaga);
}
