/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changeToBaseTrue } from "@/slices/registerSlice";
import { changeToLoginTrue } from "@/slices/loginSlice";

const NotLoggedIn = () => {
  const { base, finish } = useSelector((state: RootState) => state.register);
  const { login } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center items-center flex-col px-2 pt-2 pb-2">
      <img
        className="mt-10 mb-1 w-[140px] h-[176px] cursor-pointer "
        src="/images/new.png"
        onClick={() => {
          dispatch(changeToBaseTrue());
        }}
        alt="newuser"
      />
      <span
        className="text-center text-white bg-[#ff602a] leading-[24px] cursor-pointer rounded-[71px] w-[130px] h-[24px] text-[12px] px-2 pt-2 pb-2 my-auto"
        onClick={() => {
          dispatch(changeToLoginTrue());
        }}
      >
        登录 / 注册
      </span>
    </div>
  );
};

export default NotLoggedIn;
