"use client";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useState } from "react";

interface IProps {
  change: (page: any) => any;
  pagination: {
    cards: any; // 视频列表
    page: number;
    total: number;
    pageSize: number;
  };
}

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <a>上一页</a>;
  }
  if (type === "next") {
    return <a>下一页</a>;
  }
  return originalElement;
};

const Paginations = (props: IProps) => {
  const {
    page,
    pageSize, // 当前页视频个数
    total, // 当前视频总数
    cards, // 视频列表
  } = props.pagination;

  const [current, setCurrent] = useState(3);

  const changePage: PaginationProps["onChange"] = (
    page: any,
    pageSize: number
  ) => {
    console.log(page, pageSize);
    props.change(page);
    setCurrent(page);
  };

  return (
    <Pagination
      total={total}
      current={current}
      defaultCurrent={1}
      itemRender={itemRender}
      pageSize={pageSize}
      onChange={(page, pageSize) => {
        changePage(page, pageSize);
      }}
    />
  );
};

export default Paginations;
