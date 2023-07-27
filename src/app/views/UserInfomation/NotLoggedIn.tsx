/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { changeToBase } from "@/slices/registerSlice";
import { changeToLogin } from "@/slices/loginSlice";

const NotLoggedIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center items-center flex-col px-2 pt-2 pb-2">
      <img
        className="mt-10 mb-1 w-[140px] h-[176px] cursor-pointer "
        src="/images/new.png"
        onClick={() => {
          dispatch(changeToBase(true));
        }}
        alt="newuser"
      />
      <span
        className="text-center text-white bg-[#ff602a] leading-[24px] cursor-pointer rounded-[71px] w-[130px] h-[24px] text-[12px] px-2 pt-2 pb-2 my-auto"
        onClick={() => {
          dispatch(changeToLogin(true));
        }}
      >
        登录 / 注册
      </span>
    </div>
  );
};

export default NotLoggedIn;
