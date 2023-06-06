/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Image from "next/image";
import { getVideoDetails, getLatestLearn } from "@/network/product";
import { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCheckPay } from "@/slices/videoSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Carousel } from "antd";
import OutLine from "./OutLine";
import UserComment from "./UserComment";
import Materials from "./Materials";
import { IVideoDitails } from "@/types/api";

const VideoDetailsPage = (props: any) => {
  const levelMap = { JUNIOR: "初级", MIDDLE: "中级", SENIOR: "高级" };

  // 课程介绍海报
  const inlineHtml = (html: string) => {
    if (html?.startsWith("http")) {
      return `<img src="${html}" />`;
    }
    return html;
  };

  const dispatch = useDispatch<AppDispatch>();
  const { videoInfor } = useSelector((state: RootState) => state.video);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detailsData, setDetailsData] = useState<IVideoDitails>();
  const [latestLearnData, setLatestLearnData] = useState<any[]>();
  // tab选中状态
  const [activeKey, setActiveKey] = useState(0);

  // 当前id
  const currentId = searchParams.get("id") || "0";

  const realVideoId = useMemo(() => {
    return Number(currentId) || 1;
  }, []);

  useEffect(() => {
    dispatch(fetchCheckPay(realVideoId));
  }, []);

  useEffect(() => {
    (async (realVideoId: number) => {
      // 课程详情数据
      const detailsData = (await getVideoDetails(realVideoId)).data;
      setDetailsData(detailsData);
    })(realVideoId);
  }, []);

  useEffect(() => {
    (async (realVideoId: number) => {
      // 学员学习动态
      const latestLearnData = (await getLatestLearn(realVideoId)).data;
      setLatestLearnData(latestLearnData);
    })(realVideoId);
  }, []);

  const toPayPage = () => {
    router.push(`/payPage?id=${realVideoId}`);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full absolute bg-[#4d555d] h-[350px]"></div>
      <div className="w-[1200px] z-10">
        {/* header */}
        <div className="w-full h-[300px]   p-5 pl-0 flex justify-center mb-14">
          {/* left */}
          <div className="w-[80%] mr-5">
            <div className="text-[#d7d7d7]  text-[16px] flex items-center">
              <Link className="text-[#d7d7d7] cursor-pointer" href="/">
                首页
              </Link>
              <span>&nbsp;&gt;&nbsp;</span>
              <Link
                className="text-[#d7d7d7] cursor-pointer"
                href="/videoListPage"
              >
                课程中心
              </Link>
              <span>&nbsp;&gt;&nbsp;</span>
              <Link className="text-[#d7d7d7]" href={""}>
                课程详情
              </Link>
            </div>

            <div className="mt-[27px] mb-[4px] text-white text-[32px] font-normal">
              {detailsData?.title}
            </div>
            <p className="text-[#f2f2f2] h-[42px] overflow-hidden w-[758px] mb-[43px]">
              {detailsData?.detail}
            </p>
            <div className="flex items-center mb-[20px]">
              <span className="text-[20px] text-white font-medium">
                原价：{detailsData?.old_amount}元
              </span>
              <span className="text-[#efd3a2] text-[24px] font-mediun">
                优惠价：{detailsData?.amount}元
              </span>
              <Image
                className="cursor-pointer ml-[26px] mr-[30px]"
                src="/images/svg/wechat_large.svg"
                height={35}
                width={100}
                alt=""
              />
            </div>
            <div className="flex text-left items-center justify-between">
              <div>
                <span className="text-white pt-[4px] pb-[4px] px-[18px] text-[16px] text-center mr-[12px] bg-[#575f65]">
                  难度： {levelMap[detailsData?.course_level]}
                </span>
                <span className="text-white pt-[4px] pb-[4px] px-[18px] text-[16px] text-center mr-[12px] bg-[#575f65]">
                  课时：{detailsData?.hour}小时&nbsp;|&nbsp;
                  {detailsData?.episode_num}集
                </span>
                <span className="text-white pt-[4px] pb-[4px] px-[18px] text-[16px] text-center mr-[12px] bg-[#575f65]">
                  学习人数：{detailsData?.buy_num}
                </span>
                <span className="text-white pt-[4px] pb-[4px] px-[18px] text-[16px] text-center mr-[12px] bg-[#575f65]">
                  综合评分：{detailsData?.total_point}
                </span>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w[20%] relative h-[200px] p-4 rounded-xl bg-white flex flex-col items-center">
            <div className="absolute flex justify-center items-center flex-col top-[35px] pointer-events-none bg-[#000] opacity-80 p-[10px] rounded-xl">
              <Image src="/images/svg/play.svg" width={32} height={32} alt="" />
              <span className="text-[18px] text-white font-semibold">
                点击试看
              </span>
            </div>
            <img
              className="w-[172px] h-[117px] cursor-pointer bg-auto "
              src={detailsData?.cover_img}
              alt=""
            />
            {videoInfor.orderState ? (
              <span
                className=" h-[34px] w-[172px] px-0 pt-1 pb-1 mt-[15px] text-center rounded-md font-medium   text-[#614d28] bg-[#eace9d]  cursor-pointer leading-[26px]"
                v-if=""
              >
                立即学习
              </span>
            ) : (
              <span
                className="h-[34px] w-[172px] px-0 pt-1 pb-1 mt-[15px] text-center rounded-md font-medium cursor-pointer bg-[#ccc] text-12 leading-8"
                onClick={() => toPayPage()}
              >
                购买
              </span>
            )}
          </div>
        </div>
        {/* main */}
        <div className="flex justify-between mb-[20px]">
          <div className="w-[890px]">
            {/* 老师 */}
            <div className="shadow-xl p-[20px] rounded-[10px] w-[890px]">
              <div className="flex">
                <img
                  className="w-[100px] h-[100px] rounded-[50%]"
                  src={detailsData?.teacherDetail?.head_img}
                  alt=""
                />
                <div className="flex flex-col ml-[18px] justify-center">
                  <div className="text-[24px] text-[#222222] font-extrabold">
                    {detailsData?.teacherDetail?.name}
                  </div>
                  <div className="text-[16px] text-[#404040] mb-[12px] w-[126px]">
                    小滴课堂讲师
                  </div>
                </div>
                <div className="ml-[35px] text-[#404040]">
                  个人简介： {detailsData?.teacherDetail?.profile}
                </div>
              </div>
            </div>
            {/* 课程详情tab */}
            <div className="w-[890px]">
              <ul
                className="mt-[41px] grid grid-cols-4 gap-4 ml-[65px] text-[#4f555d] text-[16px] font-bold cursor-pointer"
                h-53px
              >
                <li
                  className={`${
                    activeKey === 0
                      ? "decoration-solid underline  underline-offset-8"
                      : ""
                  } list-none`}
                  onClick={() => setActiveKey(0)}
                >
                  课程介绍
                </li>
                <li
                  className={`${
                    activeKey === 1
                      ? "decoration-solid underline  underline-offset-8"
                      : ""
                  } list-none`}
                  onClick={() => setActiveKey(1)}
                >
                  课程目录
                </li>
                <li
                  className={`${
                    activeKey === 2
                      ? "decoration-solid underline  underline-offset-8"
                      : ""
                  } list-none`}
                  onClick={() => setActiveKey(2)}
                >
                  用户评价
                </li>
                <li
                  className={`${
                    activeKey === 3
                      ? "decoration-solid underline  underline-offset-8"
                      : ""
                  } list-none`}
                  onClick={() => setActiveKey(3)}
                >
                  课程资料
                </li>
              </ul>
            </div>

            <div>
              {activeKey === 0 && (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: inlineHtml(detailsData?.summary),
                    }}
                    className="flex justify-center overflow-hidden px-[40px] pt-0 pb-[40px]"
                  ></div>
                </div>
              )}
              {activeKey === 1 && (
                <div>
                  <OutLine id={realVideoId} />
                </div>
              )}
              {activeKey === 2 && (
                <div>
                  <UserComment id={realVideoId} />
                </div>
              )}
              {activeKey === 3 && (
                <div>
                  <Materials id={realVideoId} />
                </div>
              )}
            </div>
          </div>
          {/* 学员学习动态 */}
          <div className="ml-[50px] w-[284px] h-[350px] shadow-xl rounded-lg bg-white">
            <div className="w-[284px] mb-[20px] h-[440px]">
              <div className="flex items-center ml-[20px] mb-[20px] ">
                <Image
                  width={20}
                  height={20}
                  className="mr-[5px]"
                  src="/images/student-state.png"
                  alt=""
                />
                <div>学员动态</div>
              </div>
              <Carousel dotPosition="left" autoplay={true} dots={false}>
                {latestLearnData?.map((item, index) => (
                  <div key={index}>
                    {latestLearnData
                      ?.slice(index, index + 5)
                      ?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-center items-center m-[10px]"
                        >
                          <img
                            className="w-[40px] h-[40px] rounded-[50%]"
                            src={item?.user_head_img}
                            alt=""
                          />
                          <span className="username">{item.username}</span>
                          <span className="text-[#302a2a]">正在学习该课程</span>
                        </div>
                      ))}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
