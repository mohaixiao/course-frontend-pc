/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Divider, Row, Tag, message } from "antd";
import { getDuration } from "@/network/rank";
import { Card } from "antd";
import Image from "next/image";

const LearnRankList = () => {
  // 请求卷王排行榜数据
  const [data, setData] = useState<any[]>([]);

  async function getDurationData() {
    const data: any[] = (await getDuration()).data;
    return data;
  }

  // 默认展示9个
  const [maxData, setMaxData] = useState(9);
  // 当数据大于9条时可以滑动
  // const overflowY = useMemo(() => {
  //   return maxData <= 9 ? "hidden" : "scroll";
  // }, [maxData]);

  useEffect(() => {
    getDurationData().then((res) => {
      setData(res);
    });
  }, []);

  // 点击查看更多更新数据
  const getData = useMemo(() => {
    if (!data) return;
    // 将排行榜数据进行深拷贝
    const cloneData = JSON.parse(JSON.stringify(data));

    return cloneData?.splice(0, maxData);
  }, [data, maxData]);

  // 查看更多按钮
  const onMoreClick = function () {
    if (maxData >= data.length) {
      message.error("没有更多的数据了");
    } else {
      // 客户端时机执行toast
      if (maxData + 9 > 9) {
        message.success("加载成功，往下滚动");
      }
      setMaxData(maxData + 9);
    }
  };

  // 格式化时长
  const getMinuteHandle = function (_minute: number) {
    const hours = Math.floor(_minute / 60);
    const minute = _minute % 60;
    return `${hours}小时${minute.toFixed(2)}分`;
  };

  // 前三名的名次加颜色
  const getRankColor = function (rank: number) {
    switch (rank) {
      case 1:
        return "#FF5353";
      case 2:
        return "#F6742E";
      case 3:
        return "#FFBC09";
      default:
        return "#333333";
    }
  };

  const title = () => (
    <div className="flex flex-col">
      <div
        className="flex justify-between"
        style={{ padding: "0 24px 10px 24px" }}
      >
        <span>卷王排行榜</span>
        <Tag
          bordered={false}
          className="#a6aaae
          w-[70px]
          h-[24px]
          text-center
          leading-[22px]
          text-[12px]
          rounded-[5px]"
        >
          近七天
        </Tag>
      </div>
      <div
        className="
        text-[#404040]
        flex
        items-center
        justify-between
        text-center
        text-[14px]"
      >
        <span>排行</span>
        <span>名称</span>
        <span>学习时长</span>
      </div>
    </div>
  );

  return (
    <div className="w-[285px] h-[650px] rounded-[10px] shadow-xl">
      <Card title={title()} bordered={false} style={{ width: 285 }}>
        <div className="w-[285px] h-[500px] overflow-y-scroll no-scrollbar ">
          {getData?.map((item: any, index: number) => (
            <div className="w-[250px]" key={index}>
              <Row>
                <Col span={6}>
                  <span
                    className="text-[24px] text-center"
                    style={{ color: getRankColor(index + 1) }}
                  >
                    {index + 1}
                  </span>
                </Col>
                <Col span={10}>
                  <div className="flex items-center mr-[2px] relative">
                    <img
                      className="w-[36px] h-[36px] rounded-full select-none"
                      src={item.head_img}
                      alt=""
                    />
                    <p
                      className="h-[17px] text-[12px] ml-[9px] truncate"
                      title={item.username}
                    >
                      {item.username}
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <span className="text-[16px]">
                    {getMinuteHandle(item.minute)}
                  </span>
                </Col>
              </Row>
              <Divider />
            </div>
          ))}
        </div>
        <Button
          onClick={() => onMoreClick()}
          className="w-[250px] z-10 h-[46px] bg-[#f2f2f2] text-[#555555] m-auto"
        >
          查看更多
        </Button>
      </Card>
    </div>
  );
};

export default LearnRankList;
