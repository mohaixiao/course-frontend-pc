// import type { IVideoList } from "~/types/api";

/**
 * 视频源
 */
const baseUrl = "http://127.0.0.1:8081/api";

export const getVideo = async function (params: { episodeId: number }) {
  const data = await fetch(`${baseUrl}/getPlayUrl/v1/get_play_url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(params),
  });
  return data.json();
};
