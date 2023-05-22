/* eslint-disable @next/next/no-img-element */
import CardBase from "@/components/Card/CardBase";
import { Suspense } from "react";
import type { ProductList } from "@/types/api";
import Image from "next/image";
interface IProps {
  title?: string; // 标题
  subTitles?: string[]; // 介绍
  choiceCard: number; // 控制卡片是否展示详情介绍
  cards: ProductList[]; // 课程详情
  promise?: any;
}

const CardContainer = async ({
  title,
  subTitles,
  choiceCard,
  cards,
}: IProps) => {
  return (
    <div className="w-full">
      {/* 标题和图标 */}
      <div className={`flex items-center ${title || "hidden"}`}>
        <div className="flex items-center">
          <Image
            src="/images/icon_hot.png"
            className="h-[29px] w-[29px] mr-[5px]"
            width={29}
            height={29}
            alt="icon_hot"
          />
          <h2 className="text-[16px] text-[#4f555d]">{title}</h2>
        </div>
        {subTitles?.map((item, index) => (
          <div
            key={index}
            className="ml-[48px] flex justify-center items-center text-[14px]  mr-[40px] pt-[3px]"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center cards-bg">
        <div className="mt-[12px] flex justify-center items-center wrap gap-[24px]">
          {cards?.map((item, index) => (
            <Suspense key={index} fallback={<h2>Loading...</h2>}>
              {/* <CardBase card={item} choiceCard={choiceCard} /> */}
            </Suspense>
          ))}
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
