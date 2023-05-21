"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const LoggedIn = () => {
  const { personalInfo } = useSelector((state: RootState) => state.user);
  const [activeKey, setActiveKey] = useState(0);

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
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
