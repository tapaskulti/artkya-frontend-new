import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  allArtists: [],
  allPaintings: [],
  allOrders: [],
  adminOrderLoading: false,
  userLoading: false,
  artistLoading: false,
  paintingLoading: false,
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
    setTotalCount(state, action) {
      state.totalCount[action.payload.key] = action.payload.count;
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
  setTotalCount,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
