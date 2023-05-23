/**
 * 课程分类接口
 */

const baseUrl = "http://127.0.0.1:8081/api";

export const getCategoryList = async () => {
  let data = await fetch(`${baseUrl}/product/v1/category`);
  return data.json();
};
