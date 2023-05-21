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
    changeToBaseFalse: (state) => {
      state.base = false;
    },
    changeToBaseTrue: (state) => {
      state.base = true;
    },
    changeToFinish: (state) => {
      state.finish = !state.finish;
    },
    changeToWechatFalse: (state) => {
      state.wechat = false;
    },
    changeToWechatTrue: (state) => {
      state.wechat = true;
    },
  },
});

export const {
  changeToFinish,
  changeToBase,
  changeToWechatTrue,
  changeToWechatFalse,
  changeToBaseFalse,
  changeToBaseTrue,
} = registerSlice.actions;

export default registerSlice.reducer;
