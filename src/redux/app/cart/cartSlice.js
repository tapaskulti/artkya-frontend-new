import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  
    setAllCart(state, action) {
      state.Cart = action.payload.Cart;
    },
  },
});

export const {
    setAllCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
