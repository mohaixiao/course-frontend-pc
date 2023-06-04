"use client";
import { getHotProduct } from "@/network/rank";
import { message } from "antd";
import { IHotProduct } from "@/types/api.js";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

const HotProduct = () => {
  useEffect(() => {
    (async () => {
      const data: IHotProduct[] = (await getHotProduct()).data;
      setData(data);
    })();
  }, []);

  const [data, setData] = useState<IHotProduct[]>();
  const colorMap = ["#ffc132", "#8da3b7", "#f49855", "#df5d5d"];

  const [maxData, setMaxData] = useState(8);

  // 展示的数据列表
  const realData = useMemo(() => {
    if (data) {
      // 进行深拷贝
      let list = [...data];
      return list.splice(0, maxData);
    }
  }, [data, maxData]);

  // 查看更多的按钮
  const onMoreClick = () => {
    if (maxData >= data?.length) {
      message.error("没有更多的数据了");
    } else {
      setMaxData(maxData + 8);
      message.success("加载成功，往下滚动");
    }
  };

  return (
    <div className="w-[285px]  relative rounded-[10px] pt-[27px] z-10 h-[650px] bg-[#f4f4f4] shadow-xl">
      <Image
        src="/images/svg/hot_list.svg"
        className="absolute top-0 z-[-1]"
        width={285}
        height={120}
        alt=""
      />
      <Image
        src="/images/hot_top.png"
        width={120}
        height={130}
        className="absolute right-2 top-8 z-[-1]"
        alt=""
      />
      <button
        onClick={onMoreClick}
        className="bg-[#f2f2f2] hover:bg-slate-200 border-0 text-gray-8 rounded-[5px] text-center cursor-pointer select-none text-[14px] absolute bottom-0  w-full h-12 z-20"
      >
        查看更多
      </button>
      <span className="text-white text-[24px] font-600 pl-[15px]">
        热门排行榜
      </span>
      <div className="rounded-[10px] bg-white w-[266px] h-[502px] ml-[10px] mt-[38px] pb-[36px] flex-col flex overflow-y-scroll no-scrollbar z-10">
        {realData?.map((item, index) => (
          <div key={index}>
            <div className="pt-[4px] pl-[9px] pr-[6px] flex items-baseline justify-between relative z-2">
              <span
                className={`text-[20px] italic font-700 mr-[10px] h-[54px] ${
                  index + 1 > 4 ? "text-[#555555]" : `text-rose-600`
                }`}
              >
                {index + 1}
              </span>
              <span
                className="text-[#555555] font-500 select-none cursor-pointer w-full truncate-2 break-all"
                title={item.title}
              >
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotProduct;
