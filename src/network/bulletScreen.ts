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

/**
 * 查询集弹幕列表
 * @param params 请求参数 { beginTime: 开始时间, endTime: 结束时间, productId:课程id, episodeId: 章节id }
 */
export const listByEpisodeId = async function (params: {
  beginTime: number;
  endTime: number;
  productId: number;
  episodeId: number;
}) {
  const data = await fetch(`${baseUrl}/barrage/v1/list_by_episode`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return data.json();
};

/**
 * 发送弹幕
 * @param params 请求参数 { productId: 视频id, episodeId: 章节id, content: 弹幕内容, playTime: 播放时间 }
 */
export const addDanmu = async function (params: {
  productId: number;
  episodeId: number;
  content: string;
  playTime: number;
}) {
  const data = await fetch(`${baseUrl}/barrage/v1/add`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return data.json();
};
