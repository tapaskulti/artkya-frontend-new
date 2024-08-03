import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./app/auth/auth-slice";
import { rootSaga } from "../saga/rootSaga";
import { artReducer } from "./app/art/artSlice";
import { cartReducer } from "./app/cart/cartSlice";
import { wishlistReducer } from "./app/wishlist/wishlistSlice";
import { artistReducer } from "./app/artist/artist-slice";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    art: artReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    artist:artistReducer,
  },
  // middleware: [sagaMiddleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
