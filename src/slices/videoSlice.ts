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

/**
 * 视频
 */
// import { queryPay } from '../api/order';
// import { defineStore } from 'pinia';

// export const useVideo = defineStore('video', () => {
//   const videoInfor = reactive({
//     orderState: false,
//   });
//   // 检查课程是否购买
//   const checkPay = async (id: number) => {
//     if ((await queryPay(id)).code == 0) {
//       videoInfor.orderState = true;
//     }
//   };

//   return {
//     videoInfor,
//     checkPay,
//   };
// });
