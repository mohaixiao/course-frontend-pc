"use client";
import ChapterSection from "./ChapterSection";
import { getChapter } from "@/network/product";
import { useEffect, useState } from "react";

const OutLine = ({ id }: { id: number }) => {
  const [chapterList, setChapterList] = useState<any[]>();

  useEffect(() => {
    (async (id: number) => {
      // 目录接口数据
      console.log(id);

      const chapterList = (await getChapter(id)).data;
      console.log(chapterList, "fdghjkl;");

      setChapterList(chapterList);
    })(id);
  }, [id]);

  return (
    <>
      {chapterList?.map((item, index) => (
        <div className="flex items-center" key={index}>
          {/* 大纲组件  */}
          <div className="mb-[20px]">
            <ChapterSection item={item} index={index} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OutLine;
