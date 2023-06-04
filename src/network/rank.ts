/**
 * 获取热门商品榜数据
 */
const baseUrl = "http://127.0.0.1:8081/api";

export const getHotProduct = async () => {
  let data = await fetch(`${baseUrl}/rank/v1/hot_product`);
  return data.json();
};
