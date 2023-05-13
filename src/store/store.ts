'use client';

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../slices/registerSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      register: registerReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
