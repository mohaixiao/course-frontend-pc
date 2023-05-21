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
    changeToLogin: (state) => {
      state.login = !state.login;
    },
    changeToLoginFalse: (state) => {
      state.login = false;
    },
    changeToLoginTrue: (state) => {
      state.login = true;
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

export const {
  changeToLogin,
  changeToType,
  changeToForget,
  switchForget,
  changeToLoginFalse,
  changeToLoginTrue,
} = loginSlice.actions;

export default loginSlice.reducer;
