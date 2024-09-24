import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistDetails: {},
  artistImageUploadLoading: false,
  getAllArtByArtist: [],
  randArtAndArtist:{}
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
    setRandArtAndArtist(state, action) {
      state.randArtAndArtist = action.payload.randArtAndArtist;
    },
  },
});

export const {
  setArtistDetails,
  setArtistImageUploadLoading,
  setGetAllArtByArtist,
  setRandArtAndArtist
} = artistSlice.actions;

export const artistReducer = artistSlice.reducer;
