/**
 * 获取评价
 * @param params 查询参数
 */

const baseUrl = "http://127.0.0.1:8081/api";

export const getComment = async (params: {
  page: number;
  size: number;
  id: number;
}) => {
  const data = await fetch(`${baseUrl}/comment/v1/page`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return data.json();
};
