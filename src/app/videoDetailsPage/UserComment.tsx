/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { getComment } from "@/network/comment";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import Paginations from "@/components/Pagination";

const UserComment = ({ id }: { id: number }) => {
  const { videoInfor } = useSelector((state: RootState) => state.video);
  // 分页器默认数据
  const [paginationData, setPaginationData] = useState({
    page: 1,
    total: 0,
    pageSize: 8,
  });
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async (paginationData, id) => {
      const data = (
        await getComment({
          page: paginationData.page,
          size: paginationData.pageSize,
          id,
        })
      ).data;
      setData(data);
      // 修改总数
      const total = data?.total_record || 0;
      setPaginationData({ ...paginationData, total });
    })(paginationData, id);
  }, [id]);

  // 分页器的切换重新请求接口数据
  const change = async (page: number) => {
    setPaginationData({ ...paginationData, page });
    const data = (await getComment({ page, id, size: paginationData.pageSize }))
      .data;
    setData(data);
  };

  return (
    <div className="w-full">
      <div className="flex h-[100px] rounded-xl pt-[22px] pb-[22px] pl-[49px] leading-7 shadow-lg">
        <div className="flex items-center mr-[94px] justify-center">
          <h2 className="text-[24px] text-[#222]">
            综合
            <br />
            评分
          </h2>
          <h2 className="text-[52px] text-[#f38e48] ml-[5px] w-[40px]">
            {(
              (Number(videoInfor.contentPoint || 0) +
                Number(videoInfor.easyPoint || 0) +
                Number(videoInfor.logicPoint || 0)) /
              3
            ).toFixed(2)}
          </h2>
        </div>

        <div className="w-[1px] h-[65px] border-solid border-[1px] border-[#d7d7d7] bg-[#000]"></div>
        <div className="flex justify-center items-center flex-col ml-[65px] mr-[65px] font-medium">
          <span className="text-[28px] text-[#f38e48]">
            {videoInfor.contentPoint || 0}
          </span>
          <span className="text-[20px] text-[#222222] w-[87px]">内容实用</span>
        </div>

        <div className="w-[1px] h-[65px] border-solid border-[1px] border-[#d7d7d7] bg-[#000]"></div>
        <div className="flex justify-center items-center flex-col ml-[65px] mr-[65px] font-medium">
          <span className="text-[28px] text-[#f38e48]">
            {videoInfor.easyPoint || 0}
          </span>
          <span className="text-[20px] text-[#222222] w-[87px]">简洁易懂</span>
        </div>

        <div className="w-[1px] h-[65px] border-solid border-[1px] border-[#d7d7d7] bg-[#000]"></div>
        <div className="flex justify-center items-center flex-col ml-[65px] mr-[65px] font-medium">
          <span className="text-[28px] text-[#f38e48]">
            {videoInfor.logicPoint || 0}
          </span>
          <span className="text-[20px] text-[#222222] w-[87px]">逻辑清晰</span>
        </div>
      </div>
      {(data?.current_data || [])?.map((item: any) => (
        <div key={item.id} className="ml-[34px] mt-[39px]">
          <div className="flex">
            <img
              className="w-[60px] h-[60px] rounded-full"
              src={item?.head_img}
              alt=""
            />
            <div className="ml-[10px] w-full">
              <div className="flex justify-between items-center">
                <span className="text-[#333333] text-[20px]">
                  {item.username}
                </span>
                <Rate allowHalf value={item.total_point / 10 / 2} />
              </div>
              <p className="text-[16px] mt-[6px] text-[#555555]">
                {item.content}
              </p>

              <div className="flex justify-between items-center text-[#aaa]">
                <span>
                  {dayjs(item?.gmt_create).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {paginationData.page > 1 || (
        <div className="m-auto flex items-center justify-center">
          <Paginations pagination={paginationData} change={change} />{" "}
        </div>
      )}
    </div>
  );
};

export default UserComment;
