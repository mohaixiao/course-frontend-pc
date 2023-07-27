/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { getVideoDetails } from "@/network/product";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IVideoDitails } from "@/types/api";
import Wechat from "./Wechat";

const Page = () => {

  const searchParams = useSearchParams();
  // 当前id
  const currentId = searchParams.get("id") || "0";

  const [detailsData, setDetailsData] = useState<IVideoDitails>();
  useEffect(() => {
    (async () => {
      // 课程详情数据
      const detailsData = (await getVideoDetails(Number(currentId))).data;
      setDetailsData(detailsData);
    })();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-[1200px] flex justify-center items-center flex-col">
        <div className="rounded-[10px] h-[300px] py-[20px] px-[30px] shadow-xl">
          <div className="w-[1200px] flex justify-between">
            <div className="flex w-full">
              <img
                src={detailsData?.cover_img}
                className="w-[200px] h-[135px]"
                alt=""
              />
              <div className="flex flex-col justify-center ml-[30px]">
                <h2 className="mb-[30px] text-[#555555] text-[24px]">
                  {" "}
                  {detailsData?.title}{" "}
                </h2>
                <p className="mb-2 font-semibold  text-[#aaaaaa] text-[30px]">
                  ×1
                </p>
              </div>
            </div>
            <div className="mt-10 text-size-lg p-0">
              ¥{Number(detailsData?.amount).toFixed()}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full shadow-xl h-[120px] flex justify-center items-center mt-[50px]">
        <div className="w-[1200px] flex justify-between items-center">
          <div className="relative w-52 h-[80px]">
            <Image
              src="/images/svg/wechat_pay.svg"
              width={180}
              height={80}
              alt=""
            />
            <Image
              src="/images/pay_active.png"
              alt=""
              className="absolute right-0 bottom-0"
              width={32}
              height={32}
            />
          </div>
          <div className="flex">
            <div>
              <span className="text-[#222222] text-24px">总计支付：</span>
              <span className="text-[44px] text-[#ff4439]">
                ￥{Number(detailsData?.amount).toFixed()}
              </span>
            </div>
            <Wechat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
