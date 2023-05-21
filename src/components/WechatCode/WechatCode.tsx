"use client";
import { getWechat, watchScan } from "@/network/wechat";
import { changeToBase, changeToWechatTrue } from "@/slices/registerSlice";
import { AppDispatch } from "@/store/store";
import { WechatOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const WechatCode = () => {
  const dispatch = useDispatch<AppDispatch>();

  let lock = true; // 防抖
  let timer: NodeJS.Timer | null = null;
  const [url, setUrl] = useState("");
  // 二维码地址接口请求
  const getQrcode = async () => {
    if (lock) {
      lock = false;
      const res: any = await getWechat();
      if (res.code === 0) {
        setUrl(res.data.qrcodeUrl);
        timer = setInterval(() => watchScanDate(res.data.ticket), 3000);
        lock = true;
      }
    }
  };

  useEffect(() => {
    getQrcode();
    // 如果关闭二维码组件，清除定时器
    return () => {
      clearInterval(timer as NodeJS.Timer);
    };
  }, []);

  // 轮询请求接口查询用户扫码状态
  const watchScanDate = async (ticket: string) => {
    const res: any = await watchScan(ticket);
    if (res?.code === 0) {
      dispatch(changeToWechatTrue());
      dispatch(changeToBase());
      clearInterval(timer as NodeJS.Timer);
      message.success("登录成功");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-[100px]">
      {url ? (
        <>
          <img className="w-[200px] h-[200px]" alt="wechat" src={url} />
          <div className="flex justify-center items-center mt-[26px]">
            <WechatOutlined style={{ fontSize: "32px" }} />
            <span className="text-[18px] text-[#555555]">
              使用微信扫一扫登录
            </span>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default WechatCode;
