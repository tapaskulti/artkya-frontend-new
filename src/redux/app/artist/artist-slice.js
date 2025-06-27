import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistDetails: {},
  artistImageUploadLoading: false,
  getAllArtByArtist: [],
  randArtAndArtist: {},
  uploadProgress: 0,
  uploadError: null,
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
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload.uploadProgress;
    },
    setUploadError(state, action) {
      state.uploadError = action.payload.uploadError;
    },
    resetUpload(state) {
      state.uploadProgress = 0;
      state.uploadError = null;
      state.artistImageUploadLoading = false;
    },
  },
});

export const {
  setArtistDetails,
  setArtistImageUploadLoading,
  setGetAllArtByArtist,
  setRandArtAndArtist,
  setUploadProgress,
  setUploadError,
  resetUpload
} = artistSlice.actions;

export const artistReducer = artistSlice.reducer;