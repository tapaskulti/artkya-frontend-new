import { call, put, takeEvery } from "redux-saga/effects";
import {
  setAllArtist,
  setAllPaintings,
  setAllUsers,
  setPaintingLoading,
  setUserLoading,
  setArtistLoading,
  setTotalCount,
  setAdminOrderLoading,
  setAllOrdersSuccess,
  setAdminOrderError,
  updateAdminOrder,
  updateOrderStatusSuccess,
  downloadInvoiceSuccess,
  generateOrderReportSuccess,
  sendOrderEmailSuccess,
} from "../redux/app/admin/adminSlice";
import {
  approveArtWorkAction,
  downloadInvoiceAction,
  fetchAdminOrderByIdAction,
  fetchAdminOrdersAction,
  generateOrderReportAction,
  getAllPantingsAction,
  sendOrderEmailAction,
  updateArtistCommissionAction,
  updateOrderStatusAction,
  verifyArtistAction,
} from "../api/adminAction";
import { fetchAllUsersAction } from "../api/adminAction";
import { fetchAllArtistsAction } from "../api/adminAction";
import { fetchTotalUserArtistCountsAction } from "../api/adminAction";
import { toast } from "react-toastify";

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
    const response = yield call(updateArtistCommissionAction, action.payload);
    console.log("response======>", response);
    if (response.status === 200) {
      toast("Commision updated successfully");
    }
  } catch (error) {
    console.error("Error updating artist commission:", error.message);
    if (error) {
      toast("Failed to update Commision");
    }
  } finally {
    yield put(setArtistLoading({ artistLoading: false }));
  }
}

function* verifyArtistSaga(action) {
  try {
    yield put(setArtistLoading({ artistLoading: true }));
    const response = yield call(verifyArtistAction, action.payload);
    if (response.status === 200) {
      toast("Artist Verified successfully");
    }
  } catch (error) {
    console.error("Error updating artist commission:", error.message);
    if (error) {
      toast("Failed to Verify Artist");
    }
  } finally {
    yield put(setArtistLoading({ artistLoading: false }));
  }
}
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

export function* fetchAdminOrdersSaga(action) {
  try {
    yield put(setAdminOrderLoading(true));
    const response = yield call(fetchAdminOrdersAction, action.payload);
    console.log("response=>", response);
    if (response.status === 200) {
      yield put(
        setAllOrdersSuccess({
          orders: response.data.data.orders,
          pagination: response.data.data.pagination,
          stats: response.data.data.stats,
        })
      );
    } else {
      yield put(
        setAdminOrderError(
          response.data.message || "Failed to fetch admin orders"
        )
      );
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setAdminOrderError(error.message || "Failed to fetch admin orders")
    );
  }
}

export function* fetchAdminOrderByIdSaga(action) {
  try {
    yield put(setAdminOrderLoading(true));
    const response = yield call(fetchAdminOrderByIdAction, action.payload);

    if (response.status === 200) {
      yield put(updateAdminOrder(response.data.data.order));
      yield put(setAdminOrderLoading(false));
    } else {
      yield put(
        setAdminOrderError(
          response.data.message || "Failed to fetch order details"
        )
      );
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setAdminOrderError(error.message || "Failed to fetch order details")
    );
  }
}

export function* updateOrderStatusSaga(action) {
  try {
    const response = yield call(updateOrderStatusAction, action.payload);

    if (response.status === 200) {
      yield put(
        updateOrderStatusSuccess({
          orderId: action.payload.orderId,
          status: action.payload.status,
        })
      );
      toast("Order status updated successfully");
    } else {
      yield put(
        setAdminOrderError(
          response.data.message || "Failed to update order status"
        )
      );
      toast.error("Failed to update order status");
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setAdminOrderError(error.message || "Failed to update order status")
    );
    toast.error("Failed to update order status");
  }
}

export function* sendOrderEmailSaga(action) {
  try {
    const response = yield call(sendOrderEmailAction, action.payload);

    if (response.status === 200) {
      yield put(
        sendOrderEmailSuccess({
          orderId: action.payload.orderId,
          emailType: action.payload.emailType,
        })
      );
      toast(`${action.payload.emailType} email sent successfully`);
    } else {
      yield put(
        setAdminOrderError(response.data.message || "Failed to send email")
      );
      toast.error("Failed to send email");
    }
  } catch (error) {
    console.log(error.message);
    yield put(setAdminOrderError(error.message || "Failed to send email"));
    toast.error("Failed to send email");
  }
}

export function* generateOrderReportSaga(action) {
  try {
    const response = yield call(generateOrderReportAction, action.payload);

    if (response.status === 200) {
      yield put(
        generateOrderReportSuccess({
          reportType: action.payload.reportType,
          format: action.payload.format,
        })
      );

      // Create and download the file
      const blob = new Blob([response.data], {
        type:
          action.payload.format === "pdf"
            ? "application/pdf"
            : action.payload.format === "excel"
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "text/csv",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${action.payload.reportType}-report-${
        new Date().toISOString().split("T")[0]
      }.${action.payload.format === "excel" ? "xlsx" : action.payload.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast(`${action.payload.reportType} report generated successfully`);
    } else {
      yield put(
        setAdminOrderError(response.data.message || "Failed to generate report")
      );
      toast.error("Failed to generate report");
    }
  } catch (error) {
    console.log(error.message);
    yield put(setAdminOrderError(error.message || "Failed to generate report"));
    toast.error("Failed to generate report");
  }
}

export function* downloadInvoiceSaga(action) {
  try {
    const response = yield call(downloadInvoiceAction, action.payload);

    if (response.status === 200) {
      yield put(
        downloadInvoiceSuccess({
          orderId: action.payload.orderId,
          format: action.payload.format,
        })
      );

      // Create and download the invoice file
      const blob = new Blob([response.data], {
        type:
          action.payload.format === "pdf"
            ? "application/pdf"
            : "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${action.payload.orderId}.${action.payload.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast("Invoice downloaded successfully");
    } else {
      yield put(
        setAdminOrderError(
          response.data.message || "Failed to download invoice"
        )
      );
      toast.error("Failed to download invoice");
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setAdminOrderError(error.message || "Failed to download invoice")
    );
    toast.error("Failed to download invoice");
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
  yield takeEvery("VERIFY_ARTIST", verifyArtistSaga);
  // yield takeEvery("REJECT_ARTWORK", rejectArtworkSaga);
  yield takeEvery("APPROVE_ARTWORK", approveArtworkSaga);

  // admin order sagas
  yield takeEvery("FETCH_ADMIN_ORDERS", fetchAdminOrdersSaga);
  yield takeEvery("FETCH_ADMIN_ORDER_BY_ID", fetchAdminOrderByIdSaga);
  yield takeEvery("UPDATE_ORDER_STATUS", updateOrderStatusSaga);
  yield takeEvery("SEND_ORDER_EMAIL", sendOrderEmailSaga);
  yield takeEvery("GENERATE_ORDER_REPORT", generateOrderReportSaga);
  yield takeEvery("DOWNLOAD_INVOICE", downloadInvoiceSaga);
}
