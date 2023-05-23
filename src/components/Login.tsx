import Image from "next/image";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Account from "./Login/Account";
import { Captcha } from "./Login/Captcha";
import { changeToLogin } from "@/slices/loginSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const items: TabsProps["items"] = [
  {
    key: "account",
    label: `密码登录`,
    children: <Account />,
  },
  {
    key: "captcha",
    label: `验证码登录`,
    children: <Captcha />,
  },
];

const Login: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const dispatch = useDispatch<AppDispatch>();

  const closeNow = () => {
    dispatch(changeToLogin(false));
  };

  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 h-full bg-[#00000099]">
        <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto outline-none z-0 w-[400px] h-[500px]  m-auto rounded-xl bg-white flex">
          <Image
            src="/images/svg/close_icon.svg"
            className="cursor-pointer select-none w-[20px] h-[20px] absolute right-2 top-4"
            alt="register"
            width={20}
            height={20}
            onClick={closeNow}
          />
          <Tabs
            defaultActiveKey="account"
            items={items}
            onChange={onChange}
            className="w-[80%] mx-auto mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
