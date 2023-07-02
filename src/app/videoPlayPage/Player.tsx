"use client";
import {
  LegacyRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { IChapter } from "@/types/api";

type MyPlayerProps = {
  getVideoData: (id: number) => void;
  ref: MutableRefObject<any>;
  _episodeId: number;
  realVideoId: number;
  chapterList: any[];
};

const MyPlayer: React.FC<MyPlayerProps> = forwardRef(function Player(
  props,
  ref
) {
  const { getVideoData, _episodeId, realVideoId, chapterList } = props;
  const myPlay: LegacyRef<any> = useRef(null);

  /**
   * 实例化播放器
   */
  let player: videojs.Player | null = null;
  let newPlayer = async (playSrc: string, chapterList: any[]) => {
    // 服务端渲染时机时终止
    // 防止重复实例化播放器

    if (!player) {
      player = videojs(myPlay.current, {
        controls: true, // 控制器
        fill: true, // 填充模式
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2.0],
      });
      // 自动播放
      player.on("loadedmetadata", () => player?.play());
      // 视频播放结束回调事件
      player.on("ended", () => nextEpisod(chapterList));
    }
    player.src({
      src: playSrc,
      type: "application/x-mpegURL", // 流设置: m3u8
    });
  };

  // 视频播放结束自动切换本章下一集
  function nextEpisod(chapterList: any[]) {
    (chapterList as IChapter[]).forEach((item) => {
      item.episodeList.forEach((subItem, subIndex) => {
        // 如果真实集数据不存在改集 终止

        if (_episodeId !== subItem.id) return;
        // 该集是否有下一集，有的话请求下一集播放地址

        if (subIndex + 1 < item.episodeList.length) {
          getVideoData(item.episodeList[subIndex + 1].id);
        } else {
          // 跨章时暂停
        }
      });
    });
  }

  useEffect(() => {
    return () => {
      if (player) player.dispose();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        newPlayer(res: any, chapterList: any[]) {
          newPlayer(res, chapterList);
        },
      };
    },
    []
  );

  return (
    <video
      ref={myPlay}
      controls
      style={{ height: "100%", width: "100%" }}
      className="video-js vjs-default-skin vjs-big-play-centered"
    />
  );
});

export default MyPlayer;
