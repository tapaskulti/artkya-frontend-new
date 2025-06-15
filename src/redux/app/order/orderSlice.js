import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isOrderLoading: false,
  ordererror: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  summary: {
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
  },
  selectedOrder: null,
  filters: {
    status: "all",
    dateRange: "all",
  },
  shippingAddress: {},
  billingAddress: {},
  sameAsShipping: false,
  currentOrder: null,
  orderHistory: [],
  isCreatingOrder: false,
  orderError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsOrderLoading(state, action) {
      state.isOrderLoading = action.payload;
    },

    setOrderError(state, action) {
      state.ordererror = action.payload;
      state.isOrderLoading = false;
    },
    setOrdersSuccess(state, action) {
      const { orders, pagination, summary } = action.payload;
      state.orders = orders;
      state.pagination = pagination;
      state.summary = summary;
      state.isOrderLoading = false;
      state.ordererror = null;
    },
    updateOrder(state, action) {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order.orderId === updatedOrder.orderId
      );
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder };
      }
    },

    // Set selected order for detailed view
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },

    // Update filters
    setOrderFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },

    setShippingAddress(state, action) {
      state.shippingAddress = action.payload.shippingAddress;
    },
    setBillingAddress(state, action) {
      state.billingAddress = action.payload.billingAddress;
    },
    setSameAsShipping(state, action) {
      state.sameAsShipping = action.payload.sameAsShipping;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    setOrderHistory(state, action) {
      state.orderHistory = action.payload;
    },
    setIsCreatingOrder(state, action) {
      state.isCreatingOrder = action.payload;
    },
    clearOrderData(state) {
      state.shippingAddress = {};
      state.billingAddress = {};
      state.sameAsShipping = false;
      state.currentOrder = null;
      state.orderError = null;
    },
    // For handling address validation
    validateAddresses(state) {
      const requiredFields = [
        "firstName",
        "lastName",
        "address1",
        "country",
        "city",
        "state",
        "postalCode",
        "Email",
        "PhoneNumber",
      ];

      const shippingValid = requiredFields.every(
        (field) =>
          state.shippingAddress[field] &&
          state.shippingAddress[field].toString().trim() !== ""
      );

      let billingValid = true;
      if (!state.sameAsShipping) {
        billingValid = requiredFields.every(
          (field) =>
            state.billingAddress[field] &&
            state.billingAddress[field].toString().trim() !== ""
        );
      }

      if (!shippingValid) {
        state.orderError =
          "Please complete all required shipping address fields";
        return false;
      }

      if (!billingValid) {
        state.orderError =
          "Please complete all required billing address fields";
        return false;
      }

      state.orderError = null;
      return true;
    },
  },
});

export const {
  setIsOrderLoading,
  setOrderError,
  setOrdersSuccess,
  updateOrder,
  setSelectedOrder,
  setOrderFilters,
  setShippingAddress,
  setBillingAddress,
  setSameAsShipping,
  setCurrentOrder,
  setOrderHistory,
  setIsCreatingOrder,
  clearOrderData,
  validateAddresses,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
