/**
 * 课程分类接口
 */

import request from "./index";

export const getList = () => {
  return request({
    url: "/product/v1/category",
    method: "get",
  });
};
