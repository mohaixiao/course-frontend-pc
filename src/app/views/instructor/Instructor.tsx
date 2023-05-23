"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
interface IProps {
  name?: string;
  avatar?: string;
  company?: string;
  description?: string;
}

const Instructor = ({ name, avatar, company, description }: IProps) => {
  return (
    <div className="h-[280px] w-[280px] mt-3 mx-auto rounded-xl shadow-lg">
      <div className="flex pt-7 ml-[36px]">
        <Avatar
          shape="square"
          size={80}
          icon={<UserOutlined />}
          className="border-solid border-[1px] border-[#f2f2f2]"
          src={avatar}
        />
        <div className="flex flex-col ml-5">
          <h3 className="text-[24px] text-[#222222=]">{name}</h3>
          {/* 缺少公司介绍字段   */}
          <span className="text-[18px] text-[#404040]">{company}</span>
        </div>
      </div>
      <div className="flex flex-col w-[280px] text-[12px] mt-0 mb-[16px]">
        <div className="mt-1">
          <p className="font-bold">个人介绍:</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
