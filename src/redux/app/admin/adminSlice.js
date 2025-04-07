import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//   totalUsers: 0,
//   totalArtists: 0,
  allUsers: [],
  allArtists: [],
  userLoading: false,
  artistLoading: false,
  totalCount:{
    totalUser:"",
    totalArtist:"",
    totalPainting:"",
    totalOrders:"",
  }
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // setTotalUsers(state, action) {
    //   state.totalUsers = action.payload.totalUsers;
    // },
    // setTotalArtist(state, action) {
    //   state.totalArtists = action.payload.totalArtists;
    // },
    setAllUsers(state, action) {
      state.users = action.payload.users;
    },
    setAllArtist(state, action) {
      state.artists = action.payload.artists;
    },
    setUserLoading(state, action) {
      state.userLoading = action.payload.userLoading;
    },
    setArtistLoading(state, action) {
      state.artistLoading = action.payload.artistLoading;
    },
    setTotalCount(state, action) {
        state.totalCount[action.payload.key] = action.payload.count;
      },
  },
});

export const {
  setTotalUsers,
  setTotalArtist,
  setUsers,
  setArtist,
  setUserLoading,
  setArtistLoading,
  setTotalCount
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;








