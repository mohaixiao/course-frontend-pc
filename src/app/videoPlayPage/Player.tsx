"use client";
import {
  LegacyRef,
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type MyPlayerProps = {
  getVideoData: (id: number) => Promise<void>;
  ref: MutableRefObject<any>;
  _episodeId: number;
  realVideoId: number;
  chapterList: any[];
};

const MyPlayer: React.FC<MyPlayerProps> = forwardRef(function Player(
  props,
  ref
) {
  const myPlay: LegacyRef<any> = useRef(null);

  /**
   * 实例化播放器
   */
  let player: videojs.Player | null = null;
  let newPlayer = async (playSrc: string) => {
    // 服务端渲染时机时终止
    // 防止重复实例化播放器
    if (!player) {
      player = videojs(myPlay.current, {
        controls: true, // 控制器
        fill: true, // 填充模式
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2.0],
      });
    }
    player.src({
      src: playSrc,
      type: "application/x-mpegURL", // 流设置: m3u8
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        newPlayer(res: any) {
          newPlayer(res);
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
      class="video-js vjs-default-skin vjs-big-play-centered"
    />
  );
});

export default MyPlayer;
