"use client";
import { message } from "antd";
import { getUserInfo } from "../network/account";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const userInfo: any = await getUserInfo();
  return userInfo;
});

const initialState = {
  token: "",
  isLogin: false, // 登录
  personalInfo: {
    id: null,
    username: "",
    head_img: "",
    phone: "",
    pwd: "",
    position: null,
    slogan: "",
    sex: "1",
    city: null,
    learn_time: null,
    openid: null,
  }, // 忘记密码第一步
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    changeIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    // 同步登录信息
    asyncUserInfo: async (state) => {
      if (state.token === "") {
        state.isLogin = false;
        return;
      }
      const userInfo: any = await getUserInfo();
      if (userInfo.code === 0) {
        state.isLogin = true;
        let newPersonalInfo = { ...userInfo.data };
        state.personalInfo = newPersonalInfo;
      }
    },
    //  切换登录状态
    switchLoginState: (state, action) => {
      state.token = action.payload;
      asyncUserInfo();
    },
    /**
     * 清空用户信息
     */
    clearInfo: function (state) {
      state.token = "";
      state.isLogin = false;
      state.personalInfo = {};
      // nextTick(() => navigateTo('/'))
    },
    // 退出登录
    logout: (state) => {
      state.token = "";
      state.isLogin = false;
      state.personalInfo = {};
      message.success("退出登录成功！");
    },
  },
});

export const {
  changeIsLogin,
  changeToken,
  switchLoginState,
  asyncUserInfo,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
