import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
  sameAsShipping: false,
  currentOrder: null,
  orderHistory: [],
  isCreatingOrder: false,
  orderError: null
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
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
    setOrderError(state, action) {
      state.orderError = action.payload;
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
      const requiredFields = ['firstName', 'lastName', 'address1', 'country', 'city', 'state', 'postalCode', 'Email', 'PhoneNumber'];
      
      const shippingValid = requiredFields.every(field => 
        state.shippingAddress[field] && state.shippingAddress[field].toString().trim() !== ''
      );
      
      let billingValid = true;
      if (!state.sameAsShipping) {
        billingValid = requiredFields.every(field => 
          state.billingAddress[field] && state.billingAddress[field].toString().trim() !== ''
        );
      }
      
      if (!shippingValid) {
        state.orderError = 'Please complete all required shipping address fields';
        return false;
      }
      
      if (!billingValid) {
        state.orderError = 'Please complete all required billing address fields';
        return false;
      }
      
      state.orderError = null;
      return true;
    }
  },
});

export const { 
  setShippingAddress, 
  setBillingAddress, 
  setSameAsShipping,
  setCurrentOrder,
  setOrderHistory,
  setIsCreatingOrder,
  setOrderError,
  clearOrderData,
  validateAddresses
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;