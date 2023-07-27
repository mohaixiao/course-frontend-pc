"use client";
import Link from "next/link";
import Image from "next/image";
import HeaderSearch from "./HeaderSearch";
import RegModal from "../RegModaL";
import RegisterBase from "../Register/RegisterBase";
import RegisterFinish from "../Register/RegisterFinish";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import WechatCode from "../WechatCode/WechatCode";
import { changeToLogin } from "@/slices/loginSlice";
import { changeToBase } from "@/slices/registerSlice";
import { logout } from "@/slices/userSlice";
import Login from "../Login/Login";
import Forget from "../Forget";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";

export default function Header() {
  const { base, wechat } = useSelector((state: RootState) => state.register);
  const { login, forget } = useSelector((state: RootState) => state.login);
  const router = useRouter();

  const { personalInfo, isLogin } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const showRegister = () => {
    dispatch(changeToBase(true));
  };

  const showLogin = () => {
    dispatch(changeToLogin(true));
  };

  const userLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="flex min-w-[1200px]  basis-full h-[67px] justify-between items-center bg-white sticky top-0 z-50 shadow hover:shadow-lg">
      <div className="flex basis-full h-[72px] items-center text-[16px] justify-between">
        <div className="flex-[0.6] flex justify-between items-center">
          <Link
            className="no-underline text-[#4f555d] hover:text-[#f38e48]"
            href="/"
          >
            <Image
              src="/images/logo.png"
              alt="小滴(D)课堂"
              title="小滴(D)课堂"
              className="leading-none text-[0px]"
              width={138}
              height={68}
            />
          </Link>
          <Link
            className="no-underline text-[#4f555d] hover:text-[#f38e48]"
            href="/"
          >
            首页
          </Link>
          <Link
            className="no-underline text-[#4f555d] hover:text-[#f38e48]"
            href="/videoListPage"
          >
            课程中心
          </Link>
          <a
            className="no-underline text-[#4f555d] hover:text-[#f38e48] cursor-pointer"
            target="_blank"
          >
            云服务器
          </a>
        </div>
        <HeaderSearch />
        <Link
          className={`no-underline text-[#4f555d] hover:text-[#f38e48] ${
            isLogin || "hidden"
          }`}
          href="/personal"
        >
          个人中心
        </Link>
        <div>
          <div
            className={`flex justify-center items-center ${
              isLogin || "hidden"
            }`}
          >
            <Avatar
              shape="square"
              size={40}
              // icon={<UserOutlined />}
              className="border-solid border-[1px] border-[#f2f2f2]"
              src={personalInfo?.head_img}
            />

            <span className="mx-2 text-center">
              {personalInfo?.username?.slice(0, 3)}...
            </span>
            <span
              className="mx-2 text-center cursor-pointer"
              onClick={userLogout}
            >
              退出登录
            </span>
          </div>
          <div
            className={`flex justify-center items-center ${
              isLogin && "hidden"
            }`}
          >
            <span className="mr-8 cursor-pointer" onClick={showLogin}>
              登录
            </span>
            <span
              className="bg-[#4d555d] p-2 w-[60px] h-[30px] text-white text-center leading-6 rounded-md cursor-pointer"
              onClick={showRegister}
            >
              注册
            </span>
          </div>
        </div>
      </div>
      {base && (
        <RegModal>{wechat ? <WechatCode /> : <RegisterBase />}</RegModal>
      )}
      {login && <Login />}
      {!login && wechat && (
        <RegModal>
          <WechatCode />
        </RegModal>
      )}
      {forget && <Forget />}
      <RegisterFinish />
    </div>
  );
}
