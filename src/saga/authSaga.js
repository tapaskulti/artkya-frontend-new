import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  accessToken,
  userLoggedInAction,
  loginAction,
  logoutSagaAction,
  registerUserAction,
} from "../api/authAction";
import {
  setAuthUser,
  setAuthUserLoading,
  setError,
  setIsLoggedIn,
  setToken,
} from "../redux/app/auth/auth-slice";

function* registerSaga(action) {
  try {
    console.log(action?.payload);
    const response = yield call(registerUserAction, action?.payload);
    console.log("registerUserAction resposnse", response);
    if (response.status === 201) {
      toast.success(response?.data?.message);
    }
  } catch (error) {
    toast.warning(error?.response?.data?.message);
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(loginAction, action?.payload);
    // localStorage.setItem("User_email", action?.payload?.body?.email);
    if (response.status === 200) {
      console.log("login response----->", response);
      yield put(setError({ errMsg: "" }));
      yield put({
        type: "ACCESSTOKEN",
        payload: {
          body: action?.payload?.body?.email,
          navigate: action?.payload?.navigate,
        },
      });
      toast.success("Logged In Successfully");
      yield put(
        setIsLoggedIn({
          setIsLoggedIn: false,
        })
      );
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    yield put(setIsLoggedIn({ setIsLoggedIn: false }));
    yield put(setError({ errMsg: error?.response?.data?.message }));
  }
}

function* accessTokenSaga(action) {
  try {
    const response = yield call(accessToken, action.payload);
    if (response.status === 200) {
      yield put(setToken({ token: response?.data?.accessToken }));
      localStorage.setItem("User_email", action.payload?.body);
      
      action.payload.navigate("/");
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data.message);
    yield put(setError({ errMsg: error?.response?.data?.message }));
  }
}

function* logoutSaga(action) {
  try {
    console.log(action.payload);
    const response = yield call(logoutSagaAction, action.payload);
    if (response.status === 200) {
      toast.success(response.data.message);
      localStorage.removeItem("User_email");
      localStorage.setItem("isLoggedin", false);
      yield put(setIsLoggedIn({ isLoggedin: false }));
      yield put(setToken({ token: "" }));
      yield put(setAuthUser({ authUser: {} }));
      action.payload.body.navigate("/login");
    }
  } catch (error) {
    console.log(error);
  }
}

function* userLoggedInSaga(action) {
  try {
    const response = yield call(userLoggedInAction, action.payload);
    // console.log("logged in response in saga", response);
    if (response.status === 200) {
      yield put(setAuthUser({ authUser: response?.data?.authUser }));
      yield put(setAuthUserLoading({ authUserLoading: false }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAsyncAuthSaga() {
  yield takeEvery("REGISTER", registerSaga);
  yield takeEvery("LOGIN", loginSaga);
  yield takeEvery("ACCESSTOKEN", accessTokenSaga);
  yield takeEvery("LOGGED_IN_USER", userLoggedInSaga);
  yield takeEvery("LOGOUT_SAGA", logoutSaga);
}
