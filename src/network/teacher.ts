/**
 * 获取讲师列表
 */

// import request from "./index";
const baseUrl = "http://127.0.0.1:8081/api";

export const getTeacherList = async () => {
  const data = await fetch(`${baseUrl}/teacher/v1/list`);
  return data.json();
};
