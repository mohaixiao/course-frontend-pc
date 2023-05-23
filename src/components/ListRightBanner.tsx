/* eslint-disable @next/next/no-img-element */
"use client";
import { useMemo } from "react";
import { Carousel } from "antd";

interface IProps {
  bannerData: BannerData;
}

interface BannerData {
  img_url: string;
  pc_link: string;
}

const ListRightBanner = async ({ bannerData }: IProps) => {
  // 转成轮播图图片数组
  const bannerImgSrcs = useMemo(() => {
    return bannerData.img_url.split(",");
  }, [bannerData]);

  // 轮播图图片跳转地址
  const bannerImgHrefs = useMemo(() => {
    return bannerData.pc_link.split(",");
  }, [bannerData]);

  return (
    <Carousel autoplay className="w-[284px] h-[200px]  rounded-[10px]">
      {bannerImgSrcs &&
        bannerImgSrcs?.map((item: string, index: number) => (
          <div key={item} className="w-[284px] h-[200px]">
            <a href={bannerImgHrefs[index]}>
              <img
                src={item}
                alt="home_swiper_banner"
                className="w-[284px] h-[200px]"
              />
            </a>
          </div>
        ))}
    </Carousel>
  );
};

export default ListRightBanner;
