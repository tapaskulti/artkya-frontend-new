import { call, put, takeEvery } from "redux-saga/effects";
import {
  setAllArtist,
  setAllPaintings,
  setAllUsers,
  setPaintingLoading,
  setUserLoading,
  setArtistLoading,
} from "../redux/app/admin/adminSlice";
import { getAllPantingsAction } from "../api/adminAction";
import { fetchAllUsersAction } from "../api/adminAction";
import { fetchAllArtistsAction } from "../api/adminAction";
import { fetchTotalUserArtistCountsAction } from "../api/adminAction";

// Fetch total users and artists
function* fetchTotalCountsSaga() {
  try {
    yield put(setUserLoading({ userLoading: true }));
    yield put(setArtistLoading({ artistLoading: true }));

    const response = yield call(fetchTotalUserArtistCountsAction);
    // yield put(setTotalUsers({ totalUsers: response.totalUsers }));
    // yield put(setTotalArtist({ totalArtists: response.totalArtists }));
  } catch (error) {
    console.error("Error fetching total counts:", error.message);
  } finally {
    yield put(setUserLoading({ userLoading: false }));
    yield put(setArtistLoading({ artistLoading: false }));
  }
}

// Fetch all users
function* fetchAllUsersSaga() {
  try {
    yield put(setUserLoading({ userLoading: true }));
    const response = yield call(fetchAllUsersAction);
    yield put(setAllUsers({ users: response }));
  } catch (error) {
    console.error("Error fetching all users:", error.message);
  } finally {
    yield put(setUserLoading({ userLoading: false }));
  }
}

// Fetch all artists
function* fetchAllArtistsSaga() {
  try {
    yield put(setArtistLoading({ artistLoading: true }));

    const response = yield call(fetchAllArtistsAction);
    yield put(setAllArtist({ artists: response.data }));
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
    yield put(setAllPaintings({ allPaintings: response?.data?.data}));
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

// // Update artist commission
// function* updateArtistCommissionSaga(action) {
//   try {
//     yield put(setArtistLoading({ artistLoading: true }));
//     const { artistId, type, value } = action.payload;
//     const payload = { printPercent: value };
//     const response = yield call(
//       updateArtistCommissionAction,
//       artistId,
//       payload
//     );
//     yield put(setAllArtist({ artists: response.artists })); // Update the artists list in the store
//   } catch (error) {
//     console.error("Error updating artist commission:", error.message);
//   } finally {
//     yield put(setArtistLoading({ artistLoading: false }));
//   }
// }

// function* verifyArtistSaga(action) {}
// function* rejectArtworkSaga(action) {}
// function* approveArtworkSaga(action) {}

// Watcher Saga
export function* watchAsyncAdminSaga() {
  yield takeEvery("FETCH_TOTAL_COUNTS", fetchTotalCountsSaga);
  yield takeEvery("FETCH_ALL_USERS", fetchAllUsersSaga);
  yield takeEvery("FETCH_ALL_ARTISTS", fetchAllArtistsSaga);
  yield takeEvery("FETCH_ALL_PAINTINGS", fetchAllPaintingsSaga);
  // yield takeEvery("TOGGLE_USER_STATUS", toggleUserStatusSaga);
  // yield takeEvery("UPDATE_ARTIST_COMMISSION", updateArtistCommissionSaga);
  // yield takeEvery("VERIFY_ARTIST", verifyArtistSaga);
  // yield takeEvery("REJECT_ARTWORK", rejectArtworkSaga);
  // yield takeEvery("APPROVE_ARTWORK", approveArtworkSaga);
}
