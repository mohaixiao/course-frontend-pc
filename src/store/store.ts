"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerReducer from "../slices/registerSlice";
import loginReducer from "@/slices/loginSlice";
import userReducer from "@/slices/userSlice";
import videoReucer from "@/slices/videoSlice";
import materialsReducer from "@/slices/materialsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  video: videoReucer,
  materials: materialsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
  });
}

export const store = makeStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
