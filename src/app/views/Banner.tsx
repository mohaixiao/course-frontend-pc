/* eslint-disable @next/next/no-img-element */
"use client";
import { Carousel } from "antd";
import { getBanner } from "../../network/banner";
import { useEffect, useState } from "react";

const getBanners = async (url: string) => {
  let {
    data: { img_url: banners },
  } = await getBanner(url);
  return banners?.split(",");
};

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async function handle() {
      let banners = await getBanners("home_swiper_banner");
      setBanners(banners);
    })();
  }, []);

  return (
    <Carousel autoplay className="w-[840px] h-[400px]  rounded-[10px]">
      {banners &&
        banners?.map((item: string) => (
          <div key={item} className="w-[840px] h-[400px]">
            <img
              src={item}
              alt="home_swiper_banner"
              className="w-[840px] h-[400px]"
            />
          </div>
        ))}
    </Carousel>
  );
};

export default Banner;
