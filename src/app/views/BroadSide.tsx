/* eslint-disable @next/next/no-img-element */
"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";

const BroadSide = () => {
  const [account, setAccount] = useState(false);
  const [indexShow, setIndexShow] = useState<number>();
  const [flag, setFlag] = useState(false);
  const [width, setWidth] = useState(
    (document.documentElement.clientWidth || document.body.clientWidth) >
      1200 + 10 + 120
  );

  const onMouseenter = (i: number) => {
    if (!flag && !width) return;
    setIndexShow(i);
    setAccount(true);
  };

  const onMouseleave = () => {
    if (!flag && !width) return;
    setAccount(false);
  };

  const data = useMemo(() => {
    if (!width) {
      return ["点", "击", "我", "查", "看"];
    } else {
      return ["每日福利", "公众号", "联系讲师", "APP下载", "帮助中心"];
    }
  }, [width]);

  return (
    <div
      className={`h-[250px] bg-[#fff] fixed bottom-[35%] right-0 z-100 rounded-md shadow-lg duration-200 ${
        width ? "w-[130px]" : "w-[30px]"
      }`}
      onMouseEnter={() => setWidth(true)}
      onMouseLeave={() => setWidth(false)}
    >
      <div className="flex flex-col text-[#4d555d] text-[16px] justify-around h-full">
        {data.map((item, index) => (
          <div
            key={item}
            onMouseEnter={() => onMouseenter(index)}
            onMouseLeave={() => onMouseleave()}
            className={`w-[68px] h-[32px] font-light leading-[32px] ${
              !width ? "cursor-default" : "cursor-pointer"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className={`absolute bg-[#f2f2f2] rounded-lg left-[-229px] top-[2px] w-[230px] h-[246px] flex ${
          account && (indexShow === 1 || indexShow === 0) ? "" : "hidden"
        }`}
      >
        <div>
          <div className="text">关注小滴课堂公众号</div>
          <Image
            src="/images/OfficialAccounts.jpg"
            alt=""
            width={220}
            height={220}
          />
        </div>
        <div className="w-[10px] opacity-0"></div>
      </div>
      <div
        className={`absolute bg-[#f2f2f2] rounded-lg left-[-229px] top-[2px] w-[230px] h-[246px] flex ${
          account && indexShow === 2 ? "" : "hidden"
        }`}
      >
        <div>
          <img
            src="https://file.xdclass.net/xdclass/qrcode/teacher1.jpeg"
            alt=""
            className="h-[220px] w-[220px]"
          />
        </div>
        <div className="w-[10px] opacity-0"></div>
      </div>
      <div
        className={`absolute bg-[#f2f2f2] rounded-lg left-[-229px] top-[2px] w-[230px] h-[246px] flex  justify-center items-center ${
          account && (indexShow === 3 || indexShow === 4) ? "" : "hidden"
        }`}
      >
        <div>暂未提供</div>
        <div>敬请期待</div>
      </div>
    </div>
  );
};

export default BroadSide;
