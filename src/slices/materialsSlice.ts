"use client";
/**
 * 笔记和网盘的存储
 */
import { getVideoMaterials } from "@/network/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * 改变header title
 */
export const getVideoMaterialsData = createAsyncThunk(
  "materials/getVideoMaterialsData",
  async (id: number) => {
    const res = await getVideoMaterials(id);
    return res;
  }
);

const initialState = {
  materialsInfor: {
    bdZipUrl: "",
    noteUrl: "",
  },
} as any;

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    clearInfo: (state, action) => {
      state.materialsInfor.bdZipUrl = "";
      state.materialsInfor.noteUrl = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVideoMaterialsData.pending, (state, action) => {})
      .addCase(getVideoMaterialsData.fulfilled, (state, action) => {
        let res = action.payload;
        if (res.code === 0) {
          state.materialsInfor.bdZipUrl = res.data?.bd_zip_url;
          state.materialsInfor.noteUrl = res.data?.note_url;
        }
      });
  },
});

export const { clearInfo } = materialsSlice.actions;

export default materialsSlice.reducer;
