import Link from "next/link";
import Image from "next/image";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import RegModal from "./RegModaL";
import RegisterBase from "./RegisterBase/RegisterBase";
import RegisterFinish from "./RegisterFinish/RegisterFinish";
import { changeToBase } from "@/slices/registerSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import WechatCode from "./WechatCode/WechatCode";
import { changeToLogin } from "@/slices/loginSlice";
import Login from "./Login";
import Forget from "./Forget";

export default function Header() {
  const { base, wechat } = useSelector((state: RootState) => state.register);
  const { login, forget } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  const showRegister = () => {
    dispatch(changeToBase());
  };

  const showLogin = () => {
    dispatch(changeToLogin());
  };

  return (
    <div className="flex min-w-[1200px]  basis-full h-[67px] justify-between items-center bg-white sticky top-0 z-10 shadow hover:shadow-lg">
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
            href="/"
          >
            课程中心
          </Link>
          <a
            className="no-underline text-[#4f555d] hover:text-[#f38e48]"
            target="_blank"
          >
            云服务器
          </a>
        </div>
        <HeaderSearch />
        <div>
          <div className="flex justify-center items-center">
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
      {forget && <Forget />}
      <RegisterFinish />
    </div>
  );
}
