"use client";
import NotLoggedIn from "./UserInfomation/NotLoggedIn";
import LoggedIn from "./UserInfomation/LoggedIn";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserInformation = () => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-[180px] h-[400px] rounded-[10px] shadow-lg  flex flex-col">
      {isLogin ? <LoggedIn /> : <NotLoggedIn />}
    </div>
  );
};

export default UserInformation;
