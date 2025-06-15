import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isUploading: false,
  isFilteredDataLoading: false,
  headerMenuOpen: false,
  createArtistAcc: false,
  allArt: [],
  filteredArt: [],
  artDetail: {},
  artType: "originalArt",
  searchInput: "",
  sortCriteria: "",
  searchCriteria: "",
  artNotFound: false,
  printPrice:"",
  paymentStatus:null
};

const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setIsUploading(state, action) {
      state.isUploading = action.payload.isUploading;
    },
    setFilteredIsLoading(state, action) {
      state.isFilteredDataLoading = action.payload.isFilteredDataLoading;
    },
    setHeaderMenuOpen(state, action) {
      state.headerMenuOpen = action.payload.headerMenuOpen;
    },
    setCreateArtistAcc(state, action) {
      state.createArtistAcc = action.payload.createArtistAcc;
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
    setArtNotFound(state, action) {
      state.artNotFound = action.payload.artNotFound;
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload.searchInput;
    },
    setSortCriteria(state, action) {
      state.sortCriteria = action.payload.sortCriteria;
    },
    setSearchCriteria(state, action) {
      state.searchCriteria = action.payload.searchCriteria;
    },
    setprintPrice(state, action) {
      state.printPrice = action.payload.printPrice;
    },
    setpaymentStatus(state, action) {
      state.paymentStatus = action.payload.paymentStatus;
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
  setHeaderMenuOpen,
  setCreateArtistAcc,
  setArtNotFound,
  setSearchInput,
  setSortCriteria,
  setSearchCriteria,
  setprintPrice,
  setpaymentStatus
} = artSlice.actions;
export const artReducer = artSlice.reducer;
