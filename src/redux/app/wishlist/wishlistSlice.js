import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setAllWishlist(state, action) {
      state.wishlist = action.payload.wishlist;
    },
  },
});

export const {
    setAllWishlist,
} = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;