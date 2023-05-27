/**
 * 根据分类ID获取数据
 * @param params page-分页 size-数量 cid-分类ID cpid-方向
 */

const baseUrl = "http://127.0.0.1:8081/api";

export const queryProductByCid = async function (params: {
  page: number;
  size: number;
  cid?: number;
  cpid?: number;
}) {
  const data = await fetch(`${baseUrl}/product/v1/query_by_cid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return data.json();
};

/**
 * 获取视频详情
 * @param id 视频id
 */
export const getVideoDetails = async (id: number) => {
  const data = await fetch(`${baseUrl}/product/v1/detail?id=${id}`);
  return data.json();
};

/**
 * 最近在学
 * @param id 视频ID
 */
export const getLatestLearn = async (id: number) => {
  const data = await fetch(`${baseUrl}/order/v1/latest?id=${id}`);
  return data.json();
};

/**
 * 获取章集
 * @param id 视频ID
 */
export const getChapter = async (id: number) => {
  const data = await fetch(`${baseUrl}/product/v1/chapter?id=${id}`);
  return data.json();
};

/**
 * 资料下载权限
 * @param id 视频ID
 */
export const getVideoMaterials = async (id: number) => {
  const data = await fetch(`${baseUrl}/product/v1/material_by_id?id=${id}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  return data.json();
};
