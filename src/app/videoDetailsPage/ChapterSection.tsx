/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";

const ChapterSection = ({ item, index }: { item: any; index: number }) => {
  // 章节收缩
  const [sectionShow, setSectionShow] = useState(false);
  const chapterClick = () => {
    setSectionShow(!sectionShow);
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
        <div key={subIndex}>
          {sectionShow && item.episodeList.length > 0 && (
            <div className="text-[16px] mt-[13px] cursor-pointer px-[76px] flex">
              <div className="flex">
                <img
                  className="w-[22px] h-[22px]"
                  alt=""
                  src="/images/play.png"
                />
                <div ml-2px>
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
