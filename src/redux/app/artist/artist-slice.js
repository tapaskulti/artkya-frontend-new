import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistDetails: {},
  artistImageUploadLoading: false,
  getAllArtByArtistSaga: [],
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtistDetails(state, action) {
      state.artistDetails = action.payload.artistDetails;
    },
    setArtistImageUploadLoading(state, action) {
      state.artistImageUploadLoading = action.payload.artistImageUploadLoading;
    },
    setGetAllArtByArtistSaga(state, action) {
      state.getAllArtByArtistSaga = action.payload.getAllArtByArtistSaga;
    },
  },
});

export const {
  setArtistDetails,
  setArtistImageUploadLoading,
  setGetAllArtByArtistSaga,
} = artistSlice.actions;
export const artistReducer = artistSlice.reducer;
