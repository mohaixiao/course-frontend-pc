import Header from "@/components/Header";
import Banner from "./Banner";
import Classify from "./Classify";
import UserInformation from "./UserInformation";
import { getCardList } from "@/network/card";
import CardContainer from "./CardContainer";
import { Suspense } from "react";
import Image from "next/image";

export default async function Home() {
  // 视频卡片列表请求接口
  const cardList = (await getCardList()).data;

  return (
    <>
      <Header />
      <div className="w-[1200px] min-w-[1200px] mx-auto">
        <div className="flex justify-betwwen items-center h-[400px]">
          {/* 分类  */}
          <div className="">
            <Classify />
          </div>
          {/* 轮播图  */}
          <div className="px-4 grow-5 rounded-xl">
            <div className="w-[840px] h-[400px] rounded-md shadow-md mt-4">
              <Suspense
                fallback={
                  <Image
                    className=""
                    src="/images/svg/loader.svg"
                    width={50}
                    height={50}
                    alt="loader"
                  />
                }
              >
                <Banner />
              </Suspense>
            </div>
          </div>
          {/* 个人信息  */}
          <div className="">
            <UserInformation />
          </div>
        </div>
        {/* 热门课程 */}
        <div className="mt-[20px]">
          <Suspense
            fallback={
              <Image
                className=""
                src="/images/svg/loader.svg"
                width={50}
                height={50}
                alt="loader"
              />
            }
          >
            <CardContainer
              title={cardList[0]?.name}
              choiceCard={0}
              subTitles={[cardList[0]?.summay]}
              cards={cardList[0]?.product_list}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
