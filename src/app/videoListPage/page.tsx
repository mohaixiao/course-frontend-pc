"use client";
import { getCategoryList } from "@/network/category";
import { queryProductByCid } from "@/network/product";
import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import CardContainer from "../views/CardContainer";
import Blank from "@/components/Blank";
import Paginations from "@/components/Pagination";

const Page = () => {
  const [categoryList, setCategoryList] = useState<any[]>();
  const [productByCid, setProductByCid] = useState<any>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 当前id
  const currentId = searchParams.get("id") || "0";
  //   当前cid
  const currentCid = searchParams.get("cid") || "0";
  // 当前页数
  const page = searchParams.get("page");

  // 方向列表
  useEffect(() => {
    (async () => {
      const categoryList = (await getCategoryList()).data;
      setCategoryList(categoryList);
    })();
  }, []);

  // 课程列表接口请求
  useEffect(() => {
    (async () => {
      const productByCid = (
        await queryProductByCid({
          cid: Number(currentCid) || 0,
          page: Number(page) || 1,
          size: 12,
          cpid: Number(currentId) || 0,
        })
      ).data;
      setProductByCid(productByCid);
    })();
  }, [currentCid, currentId, page]);

  // 分页数据
  const pagination = useMemo(
    () => ({
      page: page || 1, // 当前页数
      pageSize: 12, // 当前页视频个数
      total: productByCid?.total_record, // 当前视频总数
      cards: productByCid?.current_data as any, // 视频列表
    }),
    [page, productByCid?.current_data, productByCid?.total_record]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // 切换分页
  const onPaginationChange = (page: any) => {
    router.push(pathname + "?" + createQueryString("page", page));
  };

  // 分类列表
  const subCategoryList = useMemo(() => {
    if (currentId === "0") {
      return categoryList?.flatMap((item: any) => item?.subCategoryList);
    } else {
      return categoryList
        ?.map((item: any) => item.id === Number(currentId) && item)
        ?.flatMap((item: any) => item?.subCategoryList)
        ?.filter((item: any) => item);
    }
  }, [currentId, categoryList]);

  // 判断query中的参数是否匹配
  const isMatch = (key: string, value: string) => {
    const currentId = searchParams?.get("id");
    const currentCid = searchParams?.get("cid");
    let test;
    if (key === "id") {
      test = currentId === value;
    } else {
      test = currentCid === value;
    }
    return test ? "dashed" : "link";
  };

  return (
    <div className="w-full flex-col mx-auto">
      <div className="w-full flex items-center justify-center bg-[#f9f9f9]">
        <div className=" flex flex-col w-[1200px] h-[120px] mb-[10px]">
          <div className="flex flex-wrap items-center mb-4">
            <span>方向：</span>
            <Button
              className="text-[#000]"
              type={currentId === "0" ? "dashed" : "link"}
              onClick={() => router.push(`/videoListPage?id=0`)}
            >
              全部
            </Button>
            {categoryList?.map((item: any) => (
              <Button
                key={item?.id}
                type={isMatch("id", `${item.id}`)}
                className="text-[#000]"
                onClick={() => router.push(`/videoListPage?id=${item?.id}`)}
              >
                {item?.name}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center mb-4">
            <span>分类：</span>
            <Button
              className="text-[#000]"
              type={currentCid === "0" ? "dashed" : "link"}
              onClick={() => router.push(`/videoListPage?id=0`)}
            >
              全部
            </Button>
            {subCategoryList?.map((item: any) => (
              <Button
                className="text-[#000]"
                type={isMatch("cid", `${item?.id}`)}
                onClick={() =>
                  router.push(`/videoListPage?id=${currentId}&cid=${item?.id}`)
                }
                key={item?.id}
              >
                {item?.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[1200px] flex justify-center items-center">
        <div
          className={`flex w-[898px] flex-col justify-between ${
            pagination?.cards?.length > 0 ? "" : "hidden"
          }`}
        >
          <div className="flex justify-center items-center flex-wrap">
            <CardContainer choiceCard={0} cards={pagination?.cards} />
            <Paginations pagination={pagination} change={onPaginationChange} />
          </div>
        </div>
        <div
          className={`flex w-[898px] flex-col justify-between ${
            pagination?.cards?.length > 0 ? "hidden" : ""
          } w-full text-center mt-[300px]`}
        >
          <Blank text="暂无课程。。。" />
        </div>
      </div>
    </div>
  );
};

export default Page;
