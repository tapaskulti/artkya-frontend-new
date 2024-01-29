import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./app/auth/auth-slice";
import { rootSaga } from "../saga/rootSaga";
import { artReducer } from "./app/art/artSlice";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    art: artReducer,
  },
  // middleware: [sagaMiddleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
