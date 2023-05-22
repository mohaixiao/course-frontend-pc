/**
 * 获取轮播图数据
 * @param location 具体轮播图
 */

// import request from "./index";

export const getBanner = async (location: string) => {
  const data = await fetch(
    `http://127.0.0.1:8081/api/banner/v1/list?location=${location}`
  );
  const cardList = data.json();
  return cardList;
};
