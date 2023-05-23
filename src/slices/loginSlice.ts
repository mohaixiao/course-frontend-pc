"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false, // 登录
  type: false, // 登录 or 注册
  forget: false, // 忘记密码第一步
} as any;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeToLogin: (state, action) => {
      state.login = action.payload;
    },
    changeToType: (state) => {
      state.type = !state.type;
    },
    // 打开忘记密码弹窗
    switchForget: (state) => {
      state.login = false;
      state.forget = true;
    },
    changeToForget: (state) => {
      state.forget = false;
    },
  },
});

export const { changeToLogin, changeToType, changeToForget, switchForget } =
  loginSlice.actions;

export default loginSlice.reducer;
