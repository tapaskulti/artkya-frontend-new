
import { call, put, takeEvery } from "redux-saga/effects";
import { FiltersAction} from "../api/artAction";
import { toast } from "react-toastify";
import { setFilteredIsLoading } from "../redux/app/art/artSlice";

// export function* createPostSaga(action) {
//   try {
//     yield put(
//       setIsUploading({
//         isuploading: true,
//       })
//     );
//     console.log(action.payload, "action payload");
//     const response = yield call(createArtAction, action.payload);
//     if (response.status === 200) {
//       yield put(
//         setIsUploading({
//           isuploading: false,
//         })
//       );
//       yield put({
//         type: "ALL_ART",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }



export function* filterArtSaga(action) {
    yield put(
        setFilteredIsLoading({
                isFilteredDataLoading: true,
            })
          );
  console.log("filterArtSaga=============>",action.payload)
  try {
    const response = yield call(FiltersAction, action.payload);
    // if (response.status === 200) {
    //   yield put(
    //     setIsUploading({
    //       isuploading: false,
    //     })
    //   );
    //   yield put();
    // }
  } catch (error) {
    console.log(error);
  }
}

// export function* createNonselecctArtSaga(action) {
//   try {
//     yield put(
//       setIsUploading({
//         isuploading: true,
//       })
//     );
//     const response = yield call(createNonSelectArtAction, action.payload);
//     if (response.status === 200) {
//       yield put(
//         setIsUploading({
//           isuploading: false,
//         })
//       );
//       yield put({
//         type: "ALL_NONSELECT_ART",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* getAllArtSaga(action) {
//   try {
//     yield put(
//       setIsArtListLoading({
//         isArtListLoading: true,
//       })
//     );
//     const response = yield call(getAllArtAction, action.payload);
//     console.log(response?.data?.allArts, "response from art saga");
//     if (response.status === 200) {
//       yield put(
//         setIsArtListLoading({
//           isArtListLoading: false,
//         })
//       );
//       yield put(getAllarts({ arts: response?.data?.allArts }));
//     }
//   } catch (error) {
//     toast.warning(error.message);
//   }
// }

// export function* getAllNonSelectArtSaga(action) {
//   try {
//     yield put(
//       setIsArtListLoading({
//         isArtListLoading: true,
//       })
//     );
//     const response = yield call(getAllNonSelectArtAction, action.payload);
//     if (response.status === 200) {
//       yield put(
//         setIsArtListLoading({
//           isArtListLoading: false,
//         })
//       );
//       yield put(
//         setNonSelectedArts({ nonselectedArts: response?.data?.allArts })
//       );
//     }
//   } catch (error) {
//     toast.warning(error.message);
//   }
// }

// export function* getArtDetailSaga(action) {
//   try {
//     yield put(
//       setIsLoading({
//         isLoading: true,
//       })
//     );
//     const response = yield call(getArtAction, action.payload);

//     if (response.status === 200) {
//       yield put(
//         getArtDetails({
//           artDetail: response?.data?.artDetail,
//         })
//       );
//       yield put(
//         setIsLoading({
//           isLoading: false,
//         })
//       );
//     }
//   } catch (error) {}
// }

// export function* updateArtSaga(action) {
//   console.log(action.payload, "saga");
//   const response = yield call(updateArtAction, action.payload);

//   if (response.status === 200) {
//     yield put({
//       type: "ALL_ART",
//     });
//   }
// }

// export function* updateNonSelectArtSaga(action) {
//   const response = yield call(updateNonSelectArtAction, action.payload);

//   if (response.status === 200) {
//     yield put({
//       type: "ALL_NONSELECT_ART",
//     });
//   }
// }

// export function* paymentSaga(action) {
//   try {
//     const response = yield call(paymentAction, action.payload);
//     console.log(response.data, "payment");
//     if (response.status === 200) {
//       toast.success("Payment Success");
//       alert(response.data.payment);
//     }
//   } catch (error) {
//     toast.error(error);
//   }
// }

// export function* deleteArtSaga(action) {
//   try {
//     const response = yield call(deleteArtAction, action.payload);
//     if (response.status === 200) {
//       toast.success("Art deleted");
//       yield put({
//         type: "ALL_ART",
//       });
//     }
//   } catch (error) {
//     toast.error(error);
//   }
// }

// export function* deleteNonSelectArtSaga(action) {
//   try {
//     const response = yield call(deleteNonSelectArtAction, action.payload);
//     if (response.status === 200) {
//       toast.success("Art deleted");
//       yield put({
//         type: "ALL_NONSELECT_ART",
//       });
//     }
//   } catch (error) {
//     toast.error(error);
//   }
// }

// export function* originalArtMailSaga(actions) {
//   const response = yield call(originalArtMailAction, actions.payload);
//   console.log(response, "response mail");
//   if (response.status === 200) {
//     toast.success("Email sent successfully");
//   }
// }
export function* watchAsyncArtSaga() {
  // yield takeEvery("CREATE_POST", createPostSaga);
  yield takeEvery("FILTER_ART", filterArtSaga);
  // yield takeEvery("CREATE_NONSELECT_ART", createNonselecctArtSaga);
  // yield takeEvery("ALL_ART", getAllArtSaga);
  // yield takeEvery("ALL_NONSELECT_ART", getAllNonSelectArtSaga);
  // yield takeEvery("ART_DETAIL", getArtDetailSaga);

  // yield takeEvery("UPDATE_ART", updateArtSaga);
  // yield takeEvery("UPDATE_NONSELECT_ART", updateNonSelectArtSaga);
  // yield takeEvery("DELETE_ART", deleteArtSaga);
  // yield takeEvery("DELETE_NONSELECT_ART", deleteNonSelectArtSaga);
  // yield takeEvery("PAYMENT", paymentSaga);
  // yield takeEvery("ORIGINAL_ART_MAIL", originalArtMailSaga);
}
 