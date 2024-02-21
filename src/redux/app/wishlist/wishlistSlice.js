import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistDetails:{},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setAllWishlist(state, action) {
      state.wishlistDetails = action.payload.wishlistDetails;
    },
  },
});

export const {
    setAllWishlist,
} = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;