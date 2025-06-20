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

  // Painting Management
  allPaintings: [],
  paintingLoading: false,
  paintingError: null,

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
    setAllArtist(state, action) {
      state.allArtists = action.payload.allArtists;
    },
    setAllPaintings(state, action) {
      state.allPaintings = action.payload.allPaintings;
    },
    setUserLoading(state, action) {
      state.userLoading = action.payload.userLoading;
    },
    setArtistLoading(state, action) {
      state.artistLoading = action.payload.artistLoading;
    },
    setPaintingLoading(state, action) {
      state.paintingLoading = action.payload.paintingLoading;
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
    sendOrderEmailSuccess(state, action) {
      state.adminOrderError = null;
      // Could add email history to order if needed
    },
    generateOrderReportSuccess(state, action) {
      state.adminOrderError = null;
      // Could store report generation status
    },
    downloadInvoiceSuccess(state, action) {
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
  setAllArtist,
  setAllPaintings,
  setUserLoading,
  setArtistLoading,
  setPaintingLoading,
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
  clearAllAdminData
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
