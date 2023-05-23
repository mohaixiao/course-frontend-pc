"use client";
import { getCategoryList } from "@/network/category";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export async function generateMetadata() {
  return {
    title: "小滴课堂 - 课程中心",
  };
}

const Page = () => {
  const [categoryList, setCategoryList] = useState<any[]>();
  const router = useRouter();

  // 方向列表
  useEffect(() => {
    (async () => {
      const categoryList = (await getCategoryList()).data;
      setCategoryList(categoryList);
    })();
  }, []);

  const searchParams = useSearchParams();
  // 当前id
  const currentId = searchParams.get("id") || "0";
  //   当前cid
  const currentCid = searchParams.get("cid") || "0";

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
    </div>
  );
};

export default Page;
