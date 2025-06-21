import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User Management
  allUsers: [],
  userLoading: false,
  userError: null,

  // Artist Management
  allArtists: [],
  artistLoading: false,
  artistError: null,
  artistDetails: null,
  artistAnalytics: {
    totalArtists: 0,
    activeArtists: 0,
    verifiedArtists: 0,
    averageCommission: 0,
    totalRevenue: 0,
  },

  // Painting Management
  allPaintings: [],
  paintingLoading: false,
  paintingError: null,
  paintingAnalytics: {
    overview: {
      totalPaintings: 0,
      approvedPaintings: 0,
      soldPaintings: 0,
      recentUploads: 0,
      approvalRate: 0,
      salesRate: 0,
    },
    categoryBreakdown: {},
    topArtists: [],
    revenue: {
      total: 0,
      average: 0,
    },
  },
  paintingFilters: {
    search: "",
    status: "",
    category: "",
    approved: "",
    artist: "",
    priceRange: "",
  },
  selectedPainting: null,
  paintingPagination: {
    currentPage: 1,
    totalPages: 1,
    totalPaintings: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },

  // Order Management
  allOrders: [],
  adminOrderLoading: false,
  adminOrderError: null,
  orderPagination: {
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  orderStats: {
    overview: {
      totalOrders: 0,
      todayOrders: 0,
      weekOrders: 0,
      monthOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
    },
    statusBreakdown: {},
    topArtworks: [],
  },
  selectedOrder: null,
  orderFilters: {
    search: "",
    status: "",
    paymentStatus: "",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  // Overall Counts
  totalCount: {
    totalUser: "",
    totalArtist: "",
    totalPainting: "",
    totalOrders: "",
  },
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.allUsers = action.payload.allUsers;
    },

    setUserLoading(state, action) {
      state.userLoading = action.payload.userLoading;
    },

    // Artist Managment Action

    // Artist Actions
    fetchAllArtistsStart: (state) => {
      state.artistLoading = true;
      state.artistError = null;
    },
    fetchAllArtistsSuccess: (state, action) => {
      state.artistLoading = false;
      state.allArtists = action.payload.artists;
      state.artistAnalytics = action.payload.analytics || state.artistAnalytics;
    },
    fetchAllArtistsFailure: (state, action) => {
      state.artistLoading = false;
      state.artistError = action.payload;
    },

    // Artist Details
    getArtistDetailsStart: (state) => {
      state.artistLoading = true;
      state.artistError = null;
    },
    getArtistDetailsSuccess: (state, action) => {
      state.artistLoading = false;
      state.artistDetails = action.payload;
    },
    getArtistDetailsFailure: (state, action) => {
      state.artistLoading = false;
      state.artistError = action.payload;
    },

    // Verify Artist
    verifyArtistStart: (state) => {
      state.artistLoading = true;
      state.artistError = null;
    },
    verifyArtistSuccess: (state, action) => {
      state.artistLoading = false;
      const artistIndex = state.allArtists.findIndex(
        (artist) => artist._id === action.payload.userId
      );
      if (artistIndex !== -1) {
        state.allArtists[artistIndex].verified = action.payload.verified;
      }
    },
    verifyArtistFailure: (state, action) => {
      state.artistLoading = false;
      state.artistError = action.payload;
    },

    // Update Artist Status
    updateArtistStatusStart: (state) => {
      state.artistError = null;
    },
    updateArtistStatusSuccess: (state, action) => {
      const artistIndex = state.allArtists.findIndex(
        (artist) => artist._id === action.payload.userId
      );
      if (artistIndex !== -1) {
        state.allArtists[artistIndex].status = action.payload.status;
      }
    },
    updateArtistStatusFailure: (state, action) => {
      state.artistError = action.payload;
    },

    // Toggle Art Approval Permission
    toggleArtApprovalPermissionStart: (state) => {
      state.artistError = null;
    },
    toggleArtApprovalPermissionSuccess: (state, action) => {
      const artistIndex = state.allArtists.findIndex(
        (artist) => artist._id === action.payload.userId
      );
      if (artistIndex !== -1) {
        state.allArtists[artistIndex].isArtApprovalReq =
          action.payload.isArtApprovalReq;
      }
    },
    toggleArtApprovalPermissionFailure: (state, action) => {
      state.artistError = action.payload;
    },

    // Update Artist Commission Actions
    updateArtistCommissionStart: (state) => {
      state.artistError = null;
    },
    updateArtistCommissionSuccess: (state, action) => {
      const artistIndex = state.allArtists.findIndex(
        (artist) => artist._id === action.payload.userId
      );
      if (artistIndex !== -1) {
        state.allArtists[artistIndex].originalCommission =
          action.payload.originalPercent;
      }
      // Also update artist details if it's currently loaded
      if (
        state.artistDetails &&
        state.artistDetails._id === action.payload.userId
      ) {
        state.artistDetails.originalCommission = action.payload.originalPercent;
      }
    },
    updateArtistCommissionFailure: (state, action) => {
      state.artistError = action.payload;
    },

    // Get Artist Analytics Actions
    getArtistAnalyticsStart: (state) => {
      state.artistLoading = true;
      state.artistError = null;
    },
    getArtistAnalyticsSuccess: (state, action) => {
      state.artistLoading = false;
      state.artistAnalytics = {
        ...state.artistAnalytics,
        ...(action.payload.analytics || action.payload),
      };
    },
    getArtistAnalyticsFailure: (state, action) => {
      state.artistLoading = false;
      state.artistError = action.payload;
    },

    // Export Artists Actions
    exportArtistsStart: (state) => {
      state.exportLoading = true;
      state.artistError = null;
    },
    exportArtistsSuccess: (state) => {
      state.exportLoading = false;
    },
    exportArtistsFailure: (state, action) => {
      state.exportLoading = false;
      state.artistError = action.payload;
    },

    // Painting Managment Action
    setAllPaintings(state, action) {
      state.allPaintings = action.payload.allPaintings;
      state.paintingLoading = false;
      state.paintingError = null;
    },
    setPaintingLoading(state, action) {
      state.paintingLoading = action.payload;
    },
    setPaintingError(state, action) {
      state.paintingError = action.payload;
      state.paintingLoading = false;
    },
    updatePaintingSuccess(state, action) {
      const { artId, status } = action.payload;
      const painting = state.allPaintings.find((p) => p.id === artId);
      if (painting) {
        painting.status = status;
        painting.lastUpdated = new Date().toISOString();
      }
    },
    deletePaintingSuccess(state, action) {
      const artId = action.payload;
      state.allPaintings = state.allPaintings.filter((p) => p.id !== artId);
    },
    approvePaintingSuccess(state, action) {
      const artId = action.payload;
      const painting = state.allPaintings.find((p) => p.id === artId);
      if (painting) {
        painting.approved = true;
        painting.approvedAt = new Date().toISOString();
      }
    },
    setPaintingAnalyticsSuccess(state, action) {
      state.paintingAnalytics = action.payload;
    },
    setPaintingFilters(state, action) {
      state.paintingFilters = { ...state.paintingFilters, ...action.payload };
    },
    setSelectedPainting(state, action) {
      state.selectedPainting = action.payload;
    },
    setPaintingPaginationSuccess(state, action) {
      state.paintingPagination = action.payload;
    },
    clearPaintingData(state) {
      state.allPaintings = [];
      state.selectedPainting = null;
      state.paintingError = null;
      state.paintingAnalytics = initialState.paintingAnalytics;
      state.paintingPagination = initialState.paintingPagination;
    },

    // Order Management Actions
    setAdminOrderLoading(state, action) {
      state.adminOrderLoading = action.payload;
    },
    setAdminOrderError(state, action) {
      state.adminOrderError = action.payload;
      state.adminOrderLoading = false;
    },
    setAllOrdersSuccess(state, action) {
      const { orders, pagination, stats } = action.payload;
      state.allOrders = orders;
      state.orderPagination = pagination;
      state.orderStats = stats;
      state.adminOrderLoading = false;
      state.adminOrderError = null;
    },
    updateAdminOrder(state, action) {
      const updatedOrder = action.payload;
      const index = state.allOrders.findIndex(
        (order) => order.orderId === updatedOrder.orderId
      );
      if (index !== -1) {
        state.allOrders[index] = { ...state.allOrders[index], ...updatedOrder };
      }
    },
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    setOrderFilters(state, action) {
      state.orderFilters = { ...state.orderFilters, ...action.payload };
    },
    updateOrderStatusSuccess(state, action) {
      const { orderId, status } = action.payload;
      const order = state.allOrders.find((order) => order.orderId === orderId);
      if (order) {
        order.status.order = status;
        order.lastUpdated = new Date().toISOString();

        // Update flags based on status
        if (status === "cancelled") {
          order.flags.cancelled = true;
          order.cancelled = true;
        }
        if (status === "delivered") {
          order.status.shipping = "delivered";
          order.flags.needsAttention = false;
        }
      }
    },
    clearOrdersData(state) {
      state.allOrders = [];
      state.selectedOrder = null;
      state.adminOrderError = null;
      state.orderPagination = initialState.orderPagination;
      state.orderStats = initialState.orderStats;
    },
    // Email & Report Actions
    sendOrderEmailSuccess(state) {
      state.adminOrderError = null;
      // Could add email history to order if needed
    },
    generateOrderReportSuccess(state) {
      state.adminOrderError = null;
      // Could store report generation status
    },
    downloadInvoiceSuccess(state) {
      state.adminOrderError = null;
      // Could store download history
    },

    // Total Count Updates
    setTotalCount(state, action) {
      state.totalCount[action.payload.key] = action.payload.count;
    },
    // Clear all admin data
    clearAllAdminData() {
      return initialState;
    },
  },
});

export const {
  setAllUsers,
  setUserLoading,

  // Artist actions
  fetchAllArtistsStart,
  fetchAllArtistsSuccess,
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

  // Painting actions
  setAllPaintings,
  setPaintingLoading,
  setPaintingError,
  updatePaintingSuccess,
  deletePaintingSuccess,
  approvePaintingSuccess,
  setPaintingAnalyticsSuccess,
  setPaintingFilters,
  setSelectedPainting,
  setPaintingPaginationSuccess,
  clearPaintingData,
  exportPaintingsSuccess,
  bulkApprovePaintingsSuccess,
  togglePaintingApproval,
  resetPaintingFilters,
  updateMultiplePaintings,

  // Order actions
  setAdminOrderLoading,
  setAdminOrderError,
  setAllOrdersSuccess,
  updateAdminOrder,
  setSelectedOrder,
  setOrderFilters,
  updateOrderStatusSuccess,
  clearOrdersData,
  sendOrderEmailSuccess,
  generateOrderReportSuccess,
  downloadInvoiceSuccess,

  // General actions
  setTotalCount,
  clearAllAdminData,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
