/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getPlayRrecord } from "@/network/account";
import { Progress } from "antd";
import { IPlayRecord } from "@/types/api";
import PersonalSettings from "./PersonalSettings";
/**
 * 最近播放记录
 */
const getPlayRrecordData = async (page = 1) => {
  const res = await getPlayRrecord({ page: page, size: 5 });
  return res;
};

const Personal = () => {
  const { personalInfo } = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<any>();
  useEffect(() => {
    getPlayRrecordData().then(({ data }: any) => {
      setData(data || []);
    });
  }, []);

  // 计算播放进度的百分比
  const getProgress = function (item: IPlayRecord) {
    return Math.ceil(
      (item.learn_ids.split(",")?.length / item.episode_num) * 100
    );
  };

  return (
    <div className="w-[1200px] flex flex-col m-auto justify-around shadow-md rounded-xl">
      <div className=" flex p-[20px] items-center justify-around mb-[10px]">
        <div className="item-center flex flex-col">
          <Avatar />
          <div
            className="
          text-[#222222]
          text-[16px]
          font-700
          w-[100px]
          text-center"
          >
            {personalInfo.username}
          </div>
          <div className="text-[#404040] text-[14px]">
            ID：{personalInfo.id}
          </div>
        </div>

        <div className="pl-[45px]">
          <div>
            累计学习时长：{(personalInfo.learn_time / 3600).toFixed(2)} 小时
          </div>
          <div>
            个人签名：
            {!personalInfo.slogan
              ? "这个人太懒了还没写签名"
              : personalInfo.slogan}
          </div>
        </div>

        <div className="w-[500px] h-[250px] rounded-lg flex-shrink-0 shadow-md flex justify-around items-center">
          {data?.current_data?.slice(0, 2)?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="w-[188px] h-[210px]  shadow-sm rounded-lg"
              >
                <img
                  src={item.cover_img}
                  alt=""
                  className="w-[188px] h-[110px] p-0 rounded-lg"
                />
                <div className="text-[#404040] text-[12px] h-[38px] hover:text-[#f19858]">
                  {item.product_title}
                </div>
                <div className="mb-[5px]">
                  <Progress
                    size="small"
                    strokeColor="#f38e48"
                    showInfo={false}
                    percent={getProgress(item) >= 100 ? 100 : getProgress(item)}
                  />
                </div>
                <div className="flex justify-between cursor-pointer hover:text-[#f19858] text-[12px] text-[#f38e48]">
                  <span>
                    已学习{item.learn_ids?.split(",")?.length} /{" "}
                    {item.episode_num}章节
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex mt-[15px]">
        <div className="w-full shadow-lg rounded-lg p-3">
          <PersonalSettings />
        </div>
      </div>
    </div>
  );
};

export default Personal;
