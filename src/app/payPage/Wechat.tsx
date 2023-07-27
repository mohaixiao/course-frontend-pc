"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal, message, QRCode } from "antd";
import { wechatPay, queryState } from "@/network/order";
import { useRouter } from "next/navigation";

const Wechat = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const timer = useRef<any>(null);
  // 支付订单号
  const [outTradeNo, setOutTradeNo] = useState("");
  // 支付url
  const [url, setUrl] = useState("");
  // 立即支付按钮
  const getWechatPay = async () => {
    // 请求支付二维码
    const data = await wechatPay({ id: 1, type: "PC" });
    // 如果不是客户端时机或者请求不成功就终止
    if (data.code !== 0) return;
    setOutTradeNo(data.data.out_trade_no);
    setUrl(data.data.code_url);
  };

  const showModal = async () => {
    await getWechatPay();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearInterval(timer.current);
  };

  useEffect(() => {
    if (!outTradeNo) return; // 如果outTradeNo未定义，就直接返回

    timer.current = setInterval(async () => {
      const data = await queryState(outTradeNo);
      if (data.code === 0 && data.data.order_state === "PAY") {
        clearInterval(timer.current);
        message.success("支付成功！");
        router.push("/");
      }
    }, 3000);

    return () => clearInterval(timer.current);
  }, [outTradeNo, router]);

  return (
    <>
      <button
        className="bg-[#f38e48] ml-[45px] mr-[20px] center-text-64 w-[210px] rounded-full text-white text-[24px] rounded-5px text-center cursor-pointer select-none border-0"
        onClick={showModal}
      >
        立即支付
      </button>
      <Modal
        title="扫码支付"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="z-30 height-[450px] flex justify-center items-center flex-col w-full">
          <span className="flex text-[22px] text-[#404040] mb-[25px]">
            请使用<span className=" text-[#1BB723]">微信</span>扫码支付
          </span>
          {/* 微信二维码  */}
          <div className="w-[200px] h-[200px] p-[20px] rounded-[5px]">
            {/* <QRCode value={url || ""} size={220} /> */}
          </div>
          <p className="mt-[24px] text-[#7f7f7f] ml-[15px]">
            请尽快扫码完成支付，以便订单尽快处理！
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Wechat;
