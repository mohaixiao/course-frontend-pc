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
    changeToBase: (state, action) => {
      state.base = action.payload;
    },

    changeToFinish: (state) => {
      state.finish = !state.finish;
    },
    changeToWechat: (state, action) => {
      state.wechat = action.payload;
    },
  },
});

export const { changeToFinish, changeToBase, changeToWechat } =
  registerSlice.actions;

export default registerSlice.reducer;
