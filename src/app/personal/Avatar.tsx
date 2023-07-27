/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchUser } from "@/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const token = localStorage.getItem("token");

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Avatar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { personalInfo } = useSelector((state: RootState) => state.user);
  const [imageUrl, setImageUrl] = useState<string>(personalInfo.head_img);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        dispatch(fetchUser());
      });
    }
  };

  const uploadButton = (
    <>
      <div className="opacity-60 w-[100px] z-20 bottom-0 center-text-30 ">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </>
  );

  return (
    <div>
      <Upload
        name="headImg"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="http://127.0.0.1:8081/api/user/v1/update_img"
        headers={{
          authorization: `Bearer ${token}`,
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            className=" w-[100px] h-[100px] rounded-[50%]"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default Avatar;
