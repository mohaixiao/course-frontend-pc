/**
 * 获取讲师列表
 */

import request from "./index";

export const getTeacherList = async () => {
  return request({
    url: "/teacher/v1/list",
    method: "get",
  });
};
