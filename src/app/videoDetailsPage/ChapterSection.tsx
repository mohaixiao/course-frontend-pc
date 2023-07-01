/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChapterSection = ({ item, index }: { item: any; index: number }) => {
  // 章节收缩
  const [sectionShow, setSectionShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { videoInfor } = useSelector((state: RootState) => state.video);
  const { orderState } = videoInfor;

  // 当前id
  const realVideoId = searchParams.get("id") || "0";

  const chapterClick = () => {
    setSectionShow(!sectionShow);
  };

  // 集点击播放
  const sectionClick = (val: any) => {
    // 是否登录
    if (isLogin) {
      // 是否购买
      if (orderState) {
        toPlayer(val);
      } else {
        // 是否试看
        if (val.free === 0) {
          toPlayer(val);
        } else {
          message.error("请先购买");
        }
      }
    } else {
      message.error("请先登录");
    }
  };

  // 播放视频
  const toPlayer = (val: any) => {
    router.push(`/videoPlayPage?id=${realVideoId}&eid=${val.id}`);
  };

  return (
    <div className="w-full border-2 border-[#f2f2f2]">
      {/* 章模块 */}
      <div
        className="w-[890px] h-[44px] text-[18px] leading-10 pl-8 text-[#333] flex justify-between cursor-pointer bg-[#9a96961a]"
        onClick={chapterClick}
      >
        <div>
          <span>{`第 ${index + 1} 章 `}&nbsp;</span>
          <span>{item.title}</span>
        </div>
        <div className="mr-[40px]">
          <Image
            width={20}
            height={12}
            className={`${!sectionShow ? "rotate-180" : ""} `}
            src="/images/svg/arrows-up-down.svg"
            alt=""
          />
        </div>
      </div>
      {/* 集模块 */}
      {item?.episodeList?.map((subItem: any, subIndex: number) => (
        <div key={subIndex} onClick={() => sectionClick(subItem)}>
          {sectionShow && item.episodeList.length > 0 && (
            <div className="text-[16px] mt-[13px] cursor-pointer px-[76px] flex">
              <div className="flex">
                <img
                  className="w-[22px] h-[22px]"
                  alt=""
                  src="/images/play.png"
                />
                <div className="ml-[2px]">
                  {`第 ${subIndex + 1} 节`} &nbsp;{subItem.title}
                </div>
              </div>
              {subItem.free === 0 && <div className="text-red">试看</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterSection;
