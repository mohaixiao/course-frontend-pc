import Header from "@/components/Header";
import Banner from "./views/Banner";
import Classify from "./views/Classify";
import UserInformation from "./views/UserInformation";
import { getCardList } from "@/network/card";
import CardContainer from "./views/CardContainer";
import { Suspense } from "react";
import Image from "next/image";
import AliYun from "./views/AliYun";
import LearnRankList from "@/components/LearnRankList";
import HotProduct from "@/components/HotProduct";
import AboutInstructor from "./views/instructor/AboutInstructor";
import BroadSide from "./views/BroadSide";

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
                width={200}
                height={200}
                alt="loader"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <CardContainer
              title={cardList[0]?.name}
              choiceCard={0}
              subTitles={[cardList[0]?.summay]}
              cards={cardList[0]?.product_list}
            >
              {/* 卷王排行榜 */}
              <LearnRankList />
            </CardContainer>
          </Suspense>
        </div>

        {/* 新课上线  */}
        <div className="mt-[20px]">
          <Suspense
            fallback={
              <Image
                className=""
                src="/images/svg/loader.svg"
                width={200}
                height={200}
                alt="loader"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <CardContainer
              title={cardList[1]?.name}
              choiceCard={0}
              subTitles={[cardList[1]?.summay]}
              cards={cardList[1]?.product_list}
            >
              {/* 热销排行榜  */}
              <HotProduct />
            </CardContainer>
          </Suspense>
        </div>

        {/* 中级后端工程师  */}
        <div className="mt-[20px]">
          <Suspense
            fallback={
              <Image
                className=""
                src="/images/svg/loader.svg"
                width={200}
                height={200}
                alt="loader"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <CardContainer
              title={cardList[2]?.name}
              choiceCard={0}
              subTitles={[cardList[2]?.summay]}
              cards={cardList[2]?.product_list}
            >
              {/* 阿里云海报和活动轮播图 */}
              {/* @ts-expect-error Async Server Component */}
              <AliYun />
            </CardContainer>
          </Suspense>
        </div>

        {/* 高级前端技术栈 */}
        <div className="mt-[20px]">
          <Suspense
            fallback={
              <Image
                className=""
                src="/images/svg/loader.svg"
                width={200}
                height={200}
                alt="loader"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <CardContainer
              title={cardList[3]?.name}
              choiceCard={1}
              subTitles={[cardList[3]?.summay]}
              cards={cardList[3]?.product_list}
            ></CardContainer>
          </Suspense>
        </div>

        {/* 讲师介绍 */}
        <div className="mt-[20px]">
          <Suspense
            fallback={
              <Image
                className=""
                src="/images/svg/loader.svg"
                width={200}
                height={200}
                alt="loader"
              />
            }
          >
            {/* @ts-expect-error Async Server Component */}
            <AboutInstructor />
          </Suspense>
        </div>
        {/* 侧边栏 */}
          <BroadSide />
      </div>
    </>
  );
}
