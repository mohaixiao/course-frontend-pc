/**
 * 获取轮播图数据
 * @param location 具体轮播图
 */

import request from "./index";

export const getBanner = (location: string) => {
  return request({
    url: "/banner/v1/list",
    method: "get",
    params: { location },
  });
};
