import { getWechat, watchScan } from "@/network/wechat";
import { changeToBase, changeToWechat } from "@/slices/registerSlice";
import { AppDispatch, RootState } from "@/store/store";
import { WechatOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WechatCode = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wechat, base } = useSelector((state: RootState) => state.register);

  let lock = true; // 防抖
  let timer: NodeJS.Timer | null = null;
  const qrcodeUrl = useRef("");
  const [x, setX] = useState("");
  // 二维码地址接口请求
  const getQrcode = async () => {
    if (lock) {
      lock = false;
      const res: any = await getWechat();
      if (res.code === 0) {
        setX(res.data.qrcodeUrl);
        timer = setInterval(() => watchScanDate(res.data.ticket), 3000);
        lock = true;
      }
    }
  };

  useEffect(() => {
    getQrcode();
  }, []);

  // 如果关闭二维码组件，清除定时器
  useEffect(() => {
    return clearInterval(timer);
  }, [wechat]);

  // 轮询请求接口查询用户扫码状态
  const watchScanDate = async (ticket: string) => {
    const res: any = await watchScan(ticket);
    if (res?.code === 0) {
      dispatch(changeToWechat());
      dispatch(changeToBase());
      clearInterval(timer);
      message.success("登录成功");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-[50px]">
      <img
        className="w-[200px] h-[200px]"
        alt="wechat"
        // width={200}
        // height={200}
        src={x}
      />
      <div className="flex justify-center items-center mt-[26px]">
        <WechatOutlined style={{ fontSize: "32px" }} />
        <span className="text-[18px] text-[#555555]">使用微信扫一扫登录</span>
      </div>
    </div>
  );
};

export default WechatCode;
