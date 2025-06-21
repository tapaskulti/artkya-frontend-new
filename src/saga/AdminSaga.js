import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  setAllPaintings,
  setAllUsers,
  setPaintingLoading,
  setUserLoading,
  setTotalCount,
  setAdminOrderLoading,
  setAllOrdersSuccess,
  setAdminOrderError,
  updateAdminOrder,
  updateOrderStatusSuccess,
  downloadInvoiceSuccess,
  generateOrderReportSuccess,
  sendOrderEmailSuccess,
  setPaintingError,
  approvePaintingSuccess,
  updatePaintingSuccess,
  deletePaintingSuccess,
  fetchAllArtistsSuccess,
  fetchAllArtistsStart,
  fetchAllArtistsFailure,
  getArtistDetailsStart,
  getArtistDetailsSuccess,
  getArtistDetailsFailure,
  verifyArtistStart,
  verifyArtistSuccess,
  verifyArtistFailure,
  updateArtistStatusStart,
  updateArtistStatusSuccess,
  updateArtistStatusFailure,
  toggleArtApprovalPermissionStart,
  toggleArtApprovalPermissionSuccess,
  toggleArtApprovalPermissionFailure,
  updateArtistCommissionStart,
  updateArtistCommissionSuccess,
  updateArtistCommissionFailure,
  getArtistAnalyticsStart,
  getArtistAnalyticsSuccess,
  getArtistAnalyticsFailure,
  exportArtistsStart,
  exportArtistsSuccess,
  exportArtistsFailure,
} from "../redux/app/admin/adminSlice";
import {
  approveArtWorkAction,
  bulkApprovePaintingsAction,
  deletePaintingAction,
  downloadInvoiceAction,
  exportArtists,
  exportPaintingsAction,
  fetchAdminOrderByIdAction,
  fetchAdminOrdersAction,
  fetchAllArtists,
  generateOrderReportAction,
  getAllPantingsAction,
  getArtistAnalytics,
  getArtistDetails,
  getPaintingAnalyticsAction,
  getPaintingDetailsAction,
  sendOrderEmailAction,
  toggleArtApprovalPermission,

  updateArtistCommission,

  updateArtistStatus,
  updateOrderStatusAction,
  updatePaintingStatusAction,
  verifyArtist,

} from "../api/adminAction";
import { fetchAllUsersAction } from "../api/adminAction";
import { fetchTotalUserArtistCountsAction } from "../api/adminAction";
import { toast } from "react-toastify";

// Fetch total users and artists
function* fetchTotalCountsSaga() {
  try {
    yield put(setUserLoading({ userLoading: true }));
    // yield put(setArtistLoading({ artistLoading: true }));

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
    // yield put(setArtistLoading({ artistLoading: false }));
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


//  Paintings
function* fetchAllPaintingsSaga() {
  try {
    yield put(setPaintingLoading({ paintingLoading: true }));
    const response = yield call(getAllPantingsAction);
    if (response.status === 200) {
      yield put(setAllPaintings({ allPaintings: response.data.data }));
    } else {
      yield put(
        setPaintingError(response.data.message || "Failed to fetch paintings")
      );
    }
  } catch (error) {
    console.log(error.message);
    yield put(setPaintingError(error.message || "Failed to fetch paintings"));
  }
}

function* approveArtworkSaga(action) {
  console.log("approveArtworkSaga=>", action.payload);
  try {
    const response = yield call(approveArtWorkAction, action.payload);
    if (response.status === 200) {
      yield put(approvePaintingSuccess(action.payload.artId));
      toast("Artwork approved successfully");
      yield put({ type: "FETCH_ALL_PAINTINGS" });
    } else {
      yield put(
        setPaintingError(response.data.message || "Failed to approve artwork")
      );
      toast.error("Failed to approve artwork");
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePaintingStatusSaga(action) {
  try {
    const response = yield call(updatePaintingStatusAction, action.payload);

    if (response.status === 200) {
      yield put(
        updatePaintingSuccess({
          artId: action.payload.artId,
          status: action.payload.status,
        })
      );
      toast(`Painting status updated to ${action.payload.status}`);
    } else {
      yield put(
        setPaintingError(
          response.data.message || "Failed to update painting status"
        )
      );
      toast.error("Failed to update painting status");
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setPaintingError(error.message || "Failed to update painting status")
    );
    toast.error("Failed to update painting status");
  }
}

function* deletePaintingSaga(action) {
  try {
    const response = yield call(deletePaintingAction, action.payload);

    if (response.status === 200) {
      yield put(deletePaintingSuccess(action.payload.artId));
      toast("Painting deleted successfully");
    } else {
      yield put(
        setPaintingError(response.data.message || "Failed to delete painting")
      );
      toast.error("Failed to delete painting");
    }
  } catch (error) {
    console.log(error.message);
    yield put(setPaintingError(error.message || "Failed to delete painting"));
    toast.error("Failed to delete painting");
  }
}

function* exportPaintingsSaga(action) {
  try {
    const response = yield call(exportPaintingsAction, action.payload);

    if (response.status === 200) {
      // Create and download the file
      const blob = new Blob([response.data], {
        type:
          action.payload.format === "excel"
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "text/csv",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `paintings-export-${
        new Date().toISOString().split("T")[0]
      }.${action.payload.format === "excel" ? "xlsx" : "csv"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast("Paintings exported successfully");
    } else {
      toast.error("Failed to export paintings");
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to export paintings");
  }
}

function* getPaintingAnalyticsSaga(action) {
  try {
    const response = yield call(getPaintingAnalyticsAction, action.payload);

    if (response.status === 200) {
      yield put({
        type: "SET_PAINTING_ANALYTICS_SUCCESS",
        payload: response.data.data.analytics,
      });
    } else {
      yield put(
        setPaintingError(response.data.message || "Failed to fetch analytics")
      );
    }
  } catch (error) {
    console.log(error.message);
    yield put(setPaintingError(error.message || "Failed to fetch analytics"));
  }
}

function* bulkApprovePaintingsSaga(action) {
  try {
    const response = yield call(bulkApprovePaintingsAction, action.payload);

    if (response.status === 200) {
      toast(
        `${response.data.data.modifiedCount} paintings approved successfully`
      );

      // Refresh the paintings list
      yield put({ type: "FETCH_ALL_PAINTINGS" });
    } else {
      toast.error("Failed to bulk approve paintings");
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to bulk approve paintings");
  }
}

function* getPaintingDetailsSaga(action) {
  try {
    yield put(setPaintingLoading(true));
    const response = yield call(getPaintingDetailsAction, action.payload);

    if (response.status === 200) {
      yield put({
        type: "SET_PAINTING_DETAILS_SUCCESS",
        payload: response.data.data.painting,
      });
    } else {
      yield put(
        setPaintingError(
          response.data.message || "Failed to fetch painting details"
        )
      );
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      setPaintingError(error.message || "Failed to fetch painting details")
    );
  } finally {
    yield put(setPaintingLoading(false));
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


// Fetch All Artists Saga
function* fetchAllArtistsSaga(action) {
  try {
    yield put(fetchAllArtistsStart());
    const response = yield call(fetchAllArtists, action.payload);
    yield put(fetchAllArtistsSuccess(response.data));
  } catch (error) {
    yield put(fetchAllArtistsFailure(error.response?.data?.message || 'Failed to fetch artists'));
  }
}

// Get Artist Details Saga
function* getArtistDetailsSaga(action) {
  try {
    yield put(getArtistDetailsStart());
    const response = yield call(getArtistDetails, action.payload.artistId);
    yield put(getArtistDetailsSuccess(response.data));
  } catch (error) {
    yield put(getArtistDetailsFailure(error.response?.data?.message || 'Failed to fetch artist details'));
  }
}

// Verify Artist Saga
function* verifyArtistSaga(action) {
  try {
    yield put(verifyArtistStart());
    const response = yield call(verifyArtist, action.payload);
    yield put(verifyArtistSuccess({
      userId: action.payload.userId,
      verified: response.data.verified
    }));
    // Show success notification
    // You can add notification logic here
  } catch (error) {
    yield put(verifyArtistFailure(error.response?.data?.message || 'Failed to verify artist'));
  }
}

// Update Artist Status Saga
function* updateArtistStatusSaga(action) {
  try {
    yield put(updateArtistStatusStart());
    yield call(updateArtistStatus, action.payload);
    yield put(updateArtistStatusSuccess({
      userId: action.payload.userId,
      status: action.payload.status
    }));
    // Show success notification
  } catch (error) {
    yield put(updateArtistStatusFailure(error.response?.data?.message || 'Failed to update artist status'));
  }
}

// Toggle Art Approval Permission Saga
function* toggleArtApprovalPermissionSaga(action) {
  try {
    yield put(toggleArtApprovalPermissionStart());
    yield call(toggleArtApprovalPermission, action.payload);
    yield put(toggleArtApprovalPermissionSuccess({
      userId: action.payload.userId,
      isArtApprovalReq: action.payload.isArtApprovalReq
    }));
    // Show success notification
  } catch (error) {
    yield put(toggleArtApprovalPermissionFailure(error.response?.data?.message || 'Failed to toggle art approval permission'));
  }
}

// Update Artist Commission Saga
function* updateArtistCommissionSaga(action) {
  try {
    yield put(updateArtistCommissionStart());
    yield call(updateArtistCommission, action.payload);
    yield put(updateArtistCommissionSuccess({
      userId: action.payload.userId,
      originalPercent: action.payload.originalPercent
    }));
    // Show success notification
  } catch (error) {
    yield put(updateArtistCommissionFailure(error.response?.data?.message || 'Failed to update commission'));
  }
}

// Get Artist Analytics Saga
function* getArtistAnalyticsSaga(action) {
  try {
    yield put(getArtistAnalyticsStart());
    const response = yield call(getArtistAnalytics, action.payload);
    yield put(getArtistAnalyticsSuccess(response.data));
  } catch (error) {
    yield put(getArtistAnalyticsFailure(error.response?.data?.message || 'Failed to fetch analytics'));
  }
}

// Export Artists Saga
function* exportArtistsSaga(action) {
  try {
    yield put(exportArtistsStart());
    const response = yield call(exportArtists, action.payload);
    
    // Create download link for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `artists_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    yield put(exportArtistsSuccess());
    // Show success notification
  } catch (error) {
    yield put(exportArtistsFailure(error.response?.data?.message || 'Failed to export artists'));
  }
}



// Watcher Saga
export function* watchAsyncAdminSaga() {
  yield takeEvery("FETCH_TOTAL_COUNTS", fetchTotalCountsSaga);
  yield takeEvery("FETCH_ALL_USER", fetchAllUsersSaga);

  // Artist sagaa
  yield takeEvery("FETCH_ALL_ARTISTS_REQUEST", fetchAllArtistsSaga);
  yield takeLatest('GET_ARTIST_DETAILS_REQUEST', getArtistDetailsSaga);
  yield takeEvery('VERIFY_ARTIST_REQUEST', verifyArtistSaga);
  yield takeEvery('UPDATE_ARTIST_STATUS_REQUEST', updateArtistStatusSaga);
  yield takeEvery('TOGGLE_ART_APPROVAL_PERMISSION_REQUEST', toggleArtApprovalPermissionSaga);
  yield takeEvery('UPDATE_ARTIST_COMMISSION_REQUEST', updateArtistCommissionSaga);
  yield takeLatest('GET_ARTIST_ANALYTICS_REQUEST', getArtistAnalyticsSaga);
  yield takeLatest('EXPORT_ARTISTS_REQUEST', exportArtistsSaga);

  // painting sagaa
  yield takeEvery("FETCH_ALL_PAINTINGS", fetchAllPaintingsSaga);
  yield takeEvery("APPROVE_ARTWORK", approveArtworkSaga);
  yield takeEvery("UPDATE_PAINTING_STATUS", updatePaintingStatusSaga);
  yield takeEvery("DELETE_PAINTING", deletePaintingSaga);
  yield takeEvery("EXPORT_PAINTINGS", exportPaintingsSaga);
  yield takeEvery("GET_PAINTING_ANALYTICS", getPaintingAnalyticsSaga);
  yield takeEvery("BULK_APPROVE_PAINTINGS", bulkApprovePaintingsSaga);
  yield takeEvery("GET_PAINTING_DETAILS", getPaintingDetailsSaga);

  // admin order sagas
  yield takeEvery("FETCH_ADMIN_ORDERS", fetchAdminOrdersSaga);
  yield takeEvery("FETCH_ADMIN_ORDER_BY_ID", fetchAdminOrderByIdSaga);
  yield takeEvery("UPDATE_ORDER_STATUS", updateOrderStatusSaga);
  yield takeEvery("SEND_ORDER_EMAIL", sendOrderEmailSaga);
  yield takeEvery("GENERATE_ORDER_REPORT", generateOrderReportSaga);
  yield takeEvery("DOWNLOAD_INVOICE", downloadInvoiceSaga);
}
