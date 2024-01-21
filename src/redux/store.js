import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./app/auth/auth-slice";
import { rootSaga } from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
    reducer : {
        auth: authReducer,
    },
    // middleware: [sagaMiddleware],
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

