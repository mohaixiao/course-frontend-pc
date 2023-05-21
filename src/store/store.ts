"use client";

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../slices/registerSlice";
import loginReducer from "@/slices/loginSlice";
import userReducer from "@/slices/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      register: registerReducer,
      login: loginReducer,
      user: userReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
