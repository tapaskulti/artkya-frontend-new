import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: {},
  token: "",
  userId: null,
  errMsg: "",
  authUserLoading: true,
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload.authUser;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setError(state, action) {
      state.errMsg = action.payload.errMsg;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedin = action.payload.isLoggedin;
    },
    setAuthUserLoading(state, action) {
      state.authUserLoading = action.payload.authUserLoading;
    },
  },
});

export const { setToken, setAuthUser, setError, setIsLoggedIn,setAuthUserLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
