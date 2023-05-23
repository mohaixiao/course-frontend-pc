/* eslint-disable @next/next/no-img-element */
import ListRightBanner from "@/components/ListRightBanner";
import { getBanner } from "@/network/banner";

const AliYun = async () => {
  // 阿里云海报接口请求
  const data = (await getBanner("aliyun_ecs")).data;
  // 获取活动轮播图接口请求
  const bannerData = (await getBanner("list_right_banner")).data;

  return (
    <div className="w-[284px] h-[656px] pt-[5px]">
      {/* 活动轮播图  */}
      {/* @ts-expect-error Async Server Component */}
      <ListRightBanner bannerData={bannerData} />
      {/* 阿里云海报  */}
      <div className="w-full h-[505px] shadow-xl rounded-[10px] mt-[14px]">
        <a href={data.pc_link} target="_blank">
          <img
            className="w-full h-full cursor-pointer  rounded-[10px]"
            src={data.img_url}
            alt={data.name}
          />
        </a>
      </div>
    </div>
  );
};

export default AliYun;
