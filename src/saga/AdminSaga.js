import { call, put, takeEvery } from "redux-saga/effects";
import {
  setAllArtist,
  setAllPaintings,
  setAllUsers,
  setPaintingLoading,
  setUserLoading,
  setArtistLoading,
  setTotalCount,
} from "../redux/app/admin/adminSlice";
import { approveArtWorkAction, getAllPantingsAction } from "../api/adminAction";
import { fetchAllUsersAction } from "../api/adminAction";
import { fetchAllArtistsAction } from "../api/adminAction";
import { fetchTotalUserArtistCountsAction } from "../api/adminAction";

// Fetch total users and artists
function* fetchTotalCountsSaga() {
  try {
    yield put(setUserLoading({ userLoading: true }));
    yield put(setArtistLoading({ artistLoading: true }));

    const response = yield call(fetchTotalUserArtistCountsAction);
    if (response.status === 200) {
      yield put(
        setTotalCount({
          key: "totalUser",
          count: response.data.totalArtists,
        })
      );
      yield put(
        setTotalCount({
          key: "totalArtist",
          count: response.data.totalUsers,
        })
      );
    }
  } catch (error) {
    console.error("Error fetching total counts:", error.message);
  } finally {
    yield put(setUserLoading({ userLoading: false }));
    yield put(setArtistLoading({ artistLoading: false }));
  }
}

// Fetch all users
function* fetchAllUsersSaga(action) {

  try {
    yield put(setUserLoading({ userLoading: true }));
    const response = yield call(fetchAllUsersAction, action.payload);

    console.log("fetchAllUsersSaga====>", response?.data);

    if (response?.status === 200) {
      yield put(setAllUsers({ allUsers: response?.data }));
    }
  
  } catch (error) {
    console.error("Error fetching all users:", error.message);
  } finally {
    yield put(setUserLoading({ userLoading: false }));
  }
}

// Fetch all artists
function* fetchAllArtistsSaga(action) {
  try {
    yield put(setArtistLoading({ artistLoading: true }));
    const response = yield call(fetchAllArtistsAction, action.payload);
    console.log("fetchAllArtistsSagaresponse===>", response);

    if (response.status === 200) {
      yield put(setAllArtist({ allArtists: response.data?.data }));
    }
  } catch (error) {
    console.error("Error fetching all artists:", error.message);
  } finally {
    yield put(setArtistLoading({ artistLoading: false }));
  }
}
// Fetch all Paintings
function* fetchAllPaintingsSaga() {
  try {
    yield put(setPaintingLoading({ artistLoading: true }));
    const response = yield call(getAllPantingsAction);
    yield put(setAllPaintings({ allPaintings: response?.data?.data }));
  } catch (error) {
    console.error("Error fetching all artists:", error.message);
  } finally {
    yield put(setPaintingLoading({ artistLoading: false }));
  }
}

// // Toggle user status
// function* toggleUserStatusSaga(action) {
//   try {
//     yield put(setUserLoading({ userLoading: true }));

//     const response = yield call(toggleUserStatusAction, action.payload);
//     yield put(setUsers({ users: response.users })); // Update the users list in the store
//   } catch (error) {
//     console.error("Error toggling user status:", error.message);
//   } finally {
//     yield put(setUserLoading({ userLoading: false }));
//   }
// }

// Update artist commission
function* updateArtistCommissionSaga(action) {
  try {
    yield put(setArtistLoading({ artistLoading: true }));
    const { artistId, type, value } = action.payload;
    const payload = { printPercent: value };
    const response = yield call(
      updateArtistCommissionAction,
      artistId,
      payload
    );
    yield put(setAllArtist({ artists: response.artists })); // Update the artists list in the store
  } catch (error) {
    console.error("Error updating artist commission:", error.message);
  } finally {
    yield put(setArtistLoading({ artistLoading: false }));
  }
}

// function* verifyArtistSaga(action) {}
// function* rejectArtworkSaga(action) {}
function* approveArtworkSaga(action) {
  console.log("approveArtworkSaga=>", action.payload);
  try {
    const response = yield call(approveArtWorkAction, action.payload);
    if (response.status === 200) {
      console.log(response.data);
      yield put({ type: "FETCH_ALL_PAINTINGS" });
    }
  } catch (error) {
    console.log(error);
  }
}

// Watcher Saga
export function* watchAsyncAdminSaga() {
  yield takeEvery("FETCH_TOTAL_COUNTS", fetchTotalCountsSaga);
  yield takeEvery("FETCH_ALL_USER", fetchAllUsersSaga);
  yield takeEvery("FETCH_ALL_ARTISTS", fetchAllArtistsSaga);
  yield takeEvery("FETCH_ALL_PAINTINGS", fetchAllPaintingsSaga);
  // yield takeEvery("TOGGLE_USER_STATUS", toggleUserStatusSaga);
  yield takeEvery("UPDATE_ARTIST_COMMISSION", updateArtistCommissionSaga);
  // yield takeEvery("VERIFY_ARTIST", verifyArtistSaga);
  // yield takeEvery("REJECT_ARTWORK", rejectArtworkSaga);
  yield takeEvery("APPROVE_ARTWORK", approveArtworkSaga);
}
