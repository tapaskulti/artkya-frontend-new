import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilteredDataLoading: false,
  allArt: [],
  filteredArt: [],
};

const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    setFilteredIsLoading(state, action) {
        state.isFilteredDataLoading = action.payload.isFilteredDataLoading;
      },
    setAllArt(state, action) {
      state.allArt = action.payload.allArt;
    },
    setAllFilteredArt(state, action) {
      state.filteredArt = action.payload.filteredArt;
    },
  },
});

export const { setAllArt, setAllFilteredArt ,setFilteredIsLoading} = artSlice.actions;
export const artReducer = artSlice.reducer;
