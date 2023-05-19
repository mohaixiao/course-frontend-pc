import { WechatOutlined } from "@ant-design/icons";
import { changeToWechat } from "@/slices/registerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const OAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  // 微信注册登录
  const wechatRegister = () => {
    dispatch(changeToWechat());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span color="#555555">—更多登录方式—</span>
      <WechatOutlined style={{ fontSize: "32px" }} onClick={wechatRegister} />
    </div>
  );
};

export default OAuth;
