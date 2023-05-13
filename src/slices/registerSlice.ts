"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  base: false, // 注册初始页
  finish: false, // 注册成功页
} as any;

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    changeToBase: (state) => {
      state.base = !state.base;
    },
    changeToFinish: (state) => {
      state.finish = !state.finish;
    },
  },
});

export const { changeToFinish, changeToBase } = registerSlice.actions;

export default registerSlice.reducer;
