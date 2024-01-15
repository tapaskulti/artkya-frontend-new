import { call, put, takeLatest } from "redux-saga/effects";
import {
  createArtAction,
  createNonSelectArtAction,
  deleteArtAction,
  deleteNonSelectArtAction,
  getAllArtAction,
  getAllNonSelectArtAction,
  getArtAction,
  originalArtMailAction,
  paymentAction,
  updateArtAction,
  updateNonSelectArtAction,
} from "../api/artAction";
import {
  getAllarts,
  getArtDetails,
  setIsArtListLoading,
  setIsLoading,
  setIsUploading,
  setNonSelectedArts,
} from "../redux/art-slice";
import { toast } from "react-toastify";

export function* createPostSaga(action) {
  try {
    yield put(
      setIsUploading({
        isuploading: true,
      })
    );
    console.log(action.payload, "action payload");
    const response = yield call(createArtAction, action.payload);
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

export function* createNonselecctArtSaga(action) {
  try {
    yield put(
      setIsUploading({
        isuploading: true,
      })
    );
    const response = yield call(createNonSelectArtAction, action.payload);
    if (response.status === 200) {
      yield put(
        setIsUploading({
          isuploading: false,
        })
      );
      yield put({
        type: "ALL_NONSELECT_ART",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getAllArtSaga(action) {
  try {
    yield put(
      setIsArtListLoading({
        isArtListLoading: true,
      })
    );
    const response = yield call(getAllArtAction, action.payload);
    console.log(response?.data?.allArts, "response from art saga");
    if (response.status === 200) {
      yield put(
        setIsArtListLoading({
          isArtListLoading: false,
        })
      );
      yield put(getAllarts({ arts: response?.data?.allArts }));
    }
  } catch (error) {
    toast.warning(error.message);
  }
}

export function* getAllNonSelectArtSaga(action) {
  try {
    yield put(
      setIsArtListLoading({
        isArtListLoading: true,
      })
    );
    const response = yield call(getAllNonSelectArtAction, action.payload);
    if (response.status === 200) {
      yield put(
        setIsArtListLoading({
          isArtListLoading: false,
        })
      );
      yield put(
        setNonSelectedArts({ nonselectedArts: response?.data?.allArts })
      );
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
    const response = yield call(getArtAction, action.payload);

    if (response.status === 200) {
      yield put(
        getArtDetails({
          artDetail: response?.data?.artDetail,
        })
      );
      yield put(
        setIsLoading({
          isLoading: false,
        })
      );
    }
  } catch (error) {}
}

export function* updateArtSaga(action) {
  console.log(action.payload, "saga");
  const response = yield call(updateArtAction, action.payload);

  if (response.status === 200) {
    yield put({
      type: "ALL_ART",
    });
  }
}

export function* updateNonSelectArtSaga(action) {
  const response = yield call(updateNonSelectArtAction, action.payload);

  if (response.status === 200) {
    yield put({
      type: "ALL_NONSELECT_ART",
    });
  }
}

export function* paymentSaga(action) {
  try {
    const response = yield call(paymentAction, action.payload);
    console.log(response.data, "payment");
    if (response.status === 200) {
      toast.success("Payment Success");
      alert(response.data.payment);
    }
  } catch (error) {
    toast.error(error);
  }
}

export function* deleteArtSaga(action) {
  try {
    const response = yield call(deleteArtAction, action.payload);
    if (response.status === 200) {
      toast.success("Art deleted");
      yield put({
        type: "ALL_ART",
      });
    }
  } catch (error) {
    toast.error(error);
  }
}

export function* deleteNonSelectArtSaga(action) {
  try {
    const response = yield call(deleteNonSelectArtAction, action.payload);
    if (response.status === 200) {
      toast.success("Art deleted");
      yield put({
        type: "ALL_NONSELECT_ART",
      });
    }
  } catch (error) {
    toast.error(error);
  }
}

export function* originalArtMailSaga(actions) {
  const response = yield call(originalArtMailAction, actions.payload);
  console.log(response, "response mail");
  if (response.status === 200) {
    toast.success("Email sent successfully");
  }
}
export function* watchArtAsync() {
  yield takeLatest("CREATE_POST", createPostSaga);
  yield takeLatest("CREATE_NONSELECT_ART", createNonselecctArtSaga);
  yield takeLatest("ALL_ART", getAllArtSaga);
  yield takeLatest("ALL_NONSELECT_ART", getAllNonSelectArtSaga);
  yield takeLatest("ART_DETAIL", getArtDetailSaga);

  yield takeLatest("UPDATE_ART", updateArtSaga);
  yield takeLatest("UPDATE_NONSELECT_ART", updateNonSelectArtSaga);
  yield takeLatest("DELETE_ART", deleteArtSaga);
  yield takeLatest("DELETE_NONSELECT_ART", deleteNonSelectArtSaga);
  yield takeLatest("PAYMENT", paymentSaga);
  yield takeLatest("ORIGINAL_ART_MAIL", originalArtMailSaga);
}
