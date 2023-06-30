"use client";
import { queryPay } from "@/network/order";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 同步登录信息
export const fetchCheckPay = createAsyncThunk(
  "video/fetchCheckPay",
  async (id: number) => {
    const data: any = await queryPay(id);
    return data;
  }
);

const initialState = {
  videoInfor: {
    orderState: false,
    videoPrice: null,
    easyPoint: null,
    logicPoint: null,
    contentPoint: null,
  },
} as any;

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    changeToBase: (state, action) => {
      state.base = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCheckPay.pending, (state, action) => {})
      .addCase(fetchCheckPay.fulfilled, (state, action) => {
        let data = action.payload;
        if (data.code === 0) {
          state.videoInfor.orderState = true;
        } else {
          state.videoInfor.orderState = false;
        }
      });
  },
});

export const { changeToBase } = videoSlice.actions;

export default videoSlice.reducer;
