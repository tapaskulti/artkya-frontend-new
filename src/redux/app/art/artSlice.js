import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isUploading: false,
  isFilteredDataLoading: false,
  headerMenuOpen: false,
  allArt: [],
  filteredArt: [],
  artDetail: {},
  artType:"originalArt"
};

const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isUploading = action.payload.isUploading;
    },
    setIsUploading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setFilteredIsLoading(state, action) {
      state.isFilteredDataLoading = action.payload.isFilteredDataLoading;
    },
    setHeaderMenuOpen(state, action) {
      state.headerMenuOpen = action.payload.headerMenuOpen;
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
  setIsUploading,
  setHeaderMenuOpen
} = artSlice.actions;
export const artReducer = artSlice.reducer;
