import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isFilteredDataLoading: false,
  allArt: [],
  filteredArt: [],
  artDetail: {},
};

const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setFilteredIsLoading(state, action) {
      state.isFilteredDataLoading = action.payload.isFilteredDataLoading;
    },
    setAllArt(state, action) {
      state.allArt = action.payload.allArt;
    },
    setAllFilteredArt(state, action) {
      state.filteredArt = action.payload.filteredArt;
    },
    setArtDetails(state, action) {
      state.artDetail = action.payload.artDetail;
    },
  },
});

export const {
  setAllArt,
  setAllFilteredArt,
  setFilteredIsLoading,
  setIsLoading,
  setArtDetails,
} = artSlice.actions;
export const artReducer = artSlice.reducer;
