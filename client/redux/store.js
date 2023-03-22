import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REGISTER,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slice";
import productReducer from "./slice";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          REGISTER,
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default { store, persistor };


