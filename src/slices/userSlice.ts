"use client";
import { message } from "antd";
import { getUserInfo } from "../network/account";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 同步登录信息
export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
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
  },
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
    //  切换登录状态
    switchLoginState: (state, action) => {
      state.token = action.payload;
    },
    /**
     * 清空用户信息
     */
    clearInfo: (state) => {
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
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        if (state.token === "") {
          state.isLogin = false;
          return;
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        let userInfo = action.payload;
        if (userInfo.code === 0) {
          state.isLogin = true;
          let newPersonalInfo = { ...userInfo.data };
          state.personalInfo = newPersonalInfo;
        }
      });
  },
});

export const { changeIsLogin, changeToken, switchLoginState, logout } =
  userSlice.actions;

export default userSlice.reducer;
