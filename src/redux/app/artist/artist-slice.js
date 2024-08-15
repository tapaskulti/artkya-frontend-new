import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistDetails: {},
  artistImageUploadLoading: false,
  getAllArtByArtist: [],
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
    setGetAllArtByArtist(state, action) {
      state.getAllArtByArtist = action.payload.getAllArtByArtist;
    },
  },
});

export const {
  setArtistDetails,
  setArtistImageUploadLoading,
  setGetAllArtByArtist,
} = artistSlice.actions;
export const artistReducer = artistSlice.reducer;
