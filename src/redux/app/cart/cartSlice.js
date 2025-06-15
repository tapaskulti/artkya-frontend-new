import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDetails:{},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAllCart(state, action) {
      state.cartDetails = action.payload.cartDetails;
    },
  },
});

export const {
    setAllCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
