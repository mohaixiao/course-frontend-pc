"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  base: false, // 注册初始页
  finish: false, // 注册成功页
  wechat: false,
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
    changeToWechat: (state) => {
      state.wechat = !state.wechat;
    },
  },
});

export const { changeToFinish, changeToBase, changeToWechat } =
  registerSlice.actions;

export default registerSlice.reducer;
