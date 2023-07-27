"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Progress } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { getPlayRrecord } from "@/network/account";
import { IPlayRecord } from "@/types/api";

/**
 * 最近播放记录
 */
const getPlayRrecordData = async (page = 1) => {
  const res = await getPlayRrecord({ page: page, size: 5 });
  return res;
};

const LoggedIn = () => {
  const { personalInfo } = useSelector((state: RootState) => state.user);
  const [activeKey, setActiveKey] = useState(0);
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
    <div className="flex grow-1 flex-col justify-center pb-5">
      <div>
        <div className="w-full shadow-xl">
          <div className="pt-4 ml-[14px] flex align-center relative">
            <Avatar
              shape="square"
              size={50}
              icon={<UserOutlined />}
              src={personalInfo.head_img}
            />
            <div className="ml-[12px]">
              <span className="text-[16px] w-[80px] inline-block overflow-hidden font-normal text-[#4f555d] text-400 whitespace-nowrap text-ellipsis">
                {personalInfo.username}
              </span>
            </div>
          </div>

          <div className="mt-[8px] mx-[14px] flex justify-between items-center text-[12px] text-[#7f7f7f]">
            <span>{personalInfo.learn_time}</span>
          </div>

          <div className="flex justify-center pl-[14px] pr-[14px] mt-[15px]">
            <div
              className="flex justify-center items-center flex-col mb-[10px] cursor-pointer"
              onClick={() => setActiveKey(0)}
            >
              <span text-14px color="#4f555d">
                最近学习
              </span>
              {activeKey === 0 && (
                <span className="bg-[#4f555d] w-[24px] h-[2px]"></span>
              )}
            </div>
          </div>

          <div>
            {data?.current_data
              ?.slice(0, 2)
              ?.map((item: any, index: number) => {
                return (
                  <div key={index} className=" mb-5 p-3 shadow-sm rounded-lg">
                    <div className="text-[#404040] text-[12px] h-[38px] hover:text-[#f19858]">
                      {item.product_title}
                    </div>
                    <div className="mb-[5px]">
                      <Progress
                        size="small"
                        strokeColor="#f38e48"
                        percent={
                          getProgress(item) >= 100 ? 100 : getProgress(item)
                        }
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
      </div>
    </div>
  );
};

export default LoggedIn;
