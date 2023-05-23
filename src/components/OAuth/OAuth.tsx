import { WechatOutlined } from "@ant-design/icons";
import { changeToWechat } from "@/slices/registerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { changeToLogin } from "@/slices/loginSlice";

const OAuth = ({ type }: { type?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 微信注册登录
  const wechatRegister = () => {
    dispatch(changeToWechat(true));
    dispatch(changeToLogin(false));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <span color="#555555">—更多登录方式—</span>
      <WechatOutlined
        style={{ fontSize: "32px" }}
        className="mt-4"
        onClick={wechatRegister}
      />
      <div className="w-full mt-5 flex">
        <span className="select-none m-auto z-10 text-[#404040]">
          {type ? "还没账号？" : "已有账号？"}
          <span className="text-[#5ebae2] cursor-pointer">
            {type ? "注册" : "登录"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default OAuth;
