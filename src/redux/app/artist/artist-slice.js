import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistDetails: {},
  artistImageUploadLoading: false,
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
  },
});

export const { setArtistDetails, setArtistImageUploadLoading } =
  artistSlice.actions;
export const artistReducer = artistSlice.reducer;
