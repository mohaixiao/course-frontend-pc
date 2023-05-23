"use client";
import { getCategoryList } from "@/network/category";
import { useEffect, useMemo, useState } from "react";
import { CaretRightFilled } from "@ant-design/icons";

const Classify = () => {
  const [now, setNow] = useState(0); // 鼠标悬浮选中的项
  const [showCategory, setShowCategory] = useState(false); // 是否展示子分类
  // 根据鼠标移入移除事件控制子分类弹窗的展示与否
  const displayCategory = useMemo(
    () => (showCategory ? "block" : "hidden"),
    [showCategory]
  );
  // 导航的鼠标移入事件
  const switchCategory = (id: number) => {
    setNow(id);
    setShowCategory(true);
  };

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    (async function handle() {
      // 课程分类接口请求
      let data = ((await getCategoryList()) as { data: [] }).data;
      const list: {
        name: string;
      }[] = data.map((item: { name: string }) => {
        item.name = item.name.replace("&", " | ");
        return item;
      });
      setList(list);
    })();
  }, []);

  return (
    <div className="relative w-[160px] h-[400px] rounded-md shadow-md">
      <ul className="relative pl-0 w-[100%]">
        {list &&
          list?.map(({ id, name }: { id: number; name: string }) => {
            return (
              <li
                key={id}
                className="relative w-full  h-[54px] pl-3 cursor-pointer text-[16px]  leading-[54px] list-none hover:text-white hover:bg-[#434b52]"
                onMouseEnter={() => switchCategory(id)}
                onMouseLeave={() => setShowCategory(false)}
              >
                {name}
                <div className="absolute top-0 right-3 text-[#a0a0a0] text-[13px]">
                  <CaretRightFilled />
                </div>
              </li>
            );
          })}
      </ul>

      <div
        className={`shadow-md top-0 left-[160px] z-10  rounded absolute h-[400px] w-[634px] bg-[#fdfdfd] ${displayCategory}`}
        onMouseEnter={() => setShowCategory(true)}
        onMouseLeave={() => setShowCategory(false)}
      >
        <div>
          <div>
            <span>基础课程</span>
            <div className="flex mt-2">
              {list[now]?.subCategoryList
                .filter((item: any) => item.level === "junior")
                .map((item: any) => (
                  <p key={item.id} className="ml-4 text-[12px] cursor-pointer">
                    {item.name}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-6">
            <span>进阶课程</span>
            <div className="flex mt-2">
              {list[now]?.subCategoryList
                .filter((item: any) => item.level === "middle")
                .map((item: any) => (
                  <p key={item.id} className="ml-4 text-[12px] cursor-pointer">
                    {item.name}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classify;
