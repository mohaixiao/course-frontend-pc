/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  LegacyRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { IChapter } from "@/types/api";
import useSocket from "@/hooks/socket";
import { listByEpisodeId, addDanmu } from "@/network/bulletScreen";
// @ts-ignore
import BulletScreen, { StyledBullet } from "rc-bullets-ts";
import { message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import useLatest from "@/hooks/useLatest";
import { add } from "@/network/account";
import { isBrowser } from "@/utils/getEnv";

const headUrl =
  "https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg";

type MyPlayerProps = {
  getVideoData: (id: number) => void;
  ref: MutableRefObject<any>;
  _episodeId: number;
  realVideoId: number;
  chapterList: any[];
};

const MyPlayer: React.FC<any> = forwardRef(function Player(props, ref) {
  const { getVideoData, realVideoId, _episodeId } = props;
  const myPlay: LegacyRef<any> = useRef(null);
  const curEpisodeId = useLatest(_episodeId); /*  */
  // 弹幕内容
  const [bullet, setBullet] = useState("");
  const { personalInfo } = useSelector((state: RootState) => state.user);

  const { initialize, handleAddDanmu, videoDanmuList, onBulletChat } =
    useSocket();
  initialize();

  // 弹幕内容输入事件处理
  const handleChange = ({ target: { value } }: any) => {
    setBullet(value);
  };

  // 隐藏弹幕
  const hideScreen = () => {
    let screen = new BulletScreen(".screen", { duration: 20 });
    screen.hide();
  };
  // 发送弹幕
  const handleSend = async (screen: any) => {
    if (!bullet) {
      message.error("请输入弹幕");
    }
    screen = new BulletScreen(".screen", { duration: 20 });
    if (bullet) {
      const params = {
        productId: realVideoId,
        episodeId: curEpisodeId.current,
        content: bullet,
        playTime: oVideoPlayer.currentTime + Math.random() / 0.5,
      };
      // 增加弹幕接口
      const data = await addDanmu(params);
      if (data.code === 0) {
        // socketio增加实时弹幕api
        handleAddDanmu({
          content: bullet,
          channel: "video",
          playTime: 0,
          accountId: personalInfo.id,
          head_img: personalInfo.head_img,
        });
      }
      // push 纯文本
      screen.push(bullet);
      // or 使用 StyledBullet

      screen.push(
        <StyledBullet
          head={headUrl}
          msg={bullet}
          backgroundColor={"#fff"}
          size="small"
        />
      );
      // or 还可以这样使用，效果等同使用 StyledBullet 组件
      screen.push({
        msg: bullet,
        head: headUrl,
        color: "#eee",
        size: "small",
        backgroundColor: "rgba(2,2,2,.3)",
      });
      // 置空
      setBullet("");
    }
  };

  const danmuTimer = useRef<NodeJS.Timer>();
  // 上报学习时长
  let timer = useRef<NodeJS.Timer>();

  /**
   * 实例化播放器
   */
  let speed = false;
  let player: videojs.Player | null = null;
  // 获取缓存中的播放速度，否则为1
  let playBackRate =
    Number(localStorage && localStorage.getItem("playBackRate")) || 1;
  // 防止重复实例化播放器
  let screen: any = null;
  let newPlayer = async (playSrc: string, chapterList: any[]) => {
    if (!screen) {
      // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
      screen = new BulletScreen(".screen", {
        duration: 20,
        pauseOnHover: false,
      });
      // let s=new BulletScreen(document.querySelector('.screen));
    }
    if (!player) {
      await import("videojs-hotkeys");
      player = videojs(myPlay.current, {
        controls: true, // 控制器
        fill: true, // 填充模式
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2.0],
        plugins: {
          hotkeys: {
            volumeStep: 0.1,
            seekStep: 5,
            enableModifiersForNumbers: false,
          },
        },
      });

      // 播放器开始
      player.on("play", () => onPlayerPlay(screen));
      // 播放器暂停
      player.on("pause", () => onPlayerPause(screen));
      // 自动播放
      player.on("loadedmetadata", () => onPlayerReady(player, screen));
      // 视频播放结束回调事件
      player.on("ended", () => nextEpisod(chapterList, screen));
      // 手动选择进度
      player.on("seeked", () => onPlayerSeeked(screen));

      // 改变播放速度
      player.on("ratechange", () => {
        if (speed && player) {
          localStorage &&
            localStorage.setItem(
              "playBackRate",
              player.playbackRate().toString()
            );
          playBackRate = player.playbackRate();
        }
      });
    }
    speed = false;
    player.src({
      src: playSrc,
      type: "application/x-mpegURL", // 流设置: m3u8
    });
  };

  // 当播放器手动选择进度
  const onPlayerSeeked = async function (screen: any) {
    if (danmuTimer.current) clearInterval(danmuTimer.current);
    // 停止弹幕清空
    screen.pause();
    // 重置弹幕
    screen.clear();
    // 请求数据
    await getDanmuData(screen);
    // 开启弹幕接口轮询
    danmuTimer.current = setInterval(async () => {
      await getDanmuData(screen);
    }, 10 * 1000);
  };

  // 视频播放结束自动切换本章下一集
  function nextEpisod(chapterList: any[], screen: any) {
    (chapterList as IChapter[]).forEach((item) => {
      item.episodeList.forEach((subItem, subIndex) => {
        // 如果真实集数据不存在改集 终止

        if (_episodeId !== subItem.id) return;
        // 该集是否有下一集，有的话请求下一集播放地址

        if (subIndex + 1 < item.episodeList.length) {
          getVideoData(item.episodeList[subIndex + 1].id);
          screen.clear();
        } else {
          // 跨章时暂停
        }
      });
    });
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      if (oVideoPlayer && !oVideoPlayer.paused) {
        add({
          productId: realVideoId,
          episodeId: curEpisodeId.current,
          duration: Math.floor(oVideoPlayer.currentTime),
        });
      }
    }, 10 * 1000);

    videoDanmuList.current.forEach((item) => {
      screen.push({
        msg: item.content,
        head: item.head_img,
        color: "#eee",
        size: "small",
        backgroundColor: "rgba(2,2,2,.3)",
      });
    });
    return () => {
      if (player) player.dispose();
      if (danmuTimer.current) clearInterval(danmuTimer.current);
    };
  }, [player, videoDanmuList.current.length]);

  useImperativeHandle(
    ref,
    () => {
      return {
        newPlayer(res: any, chapterList: any[]) {
          newPlayer(res, chapterList);
        },
        screen,
      };
    },
    []
  );

  let oVideoPlayer: HTMLVideoElement;

  async function getDanmuData(screen: any) {
    const currentTime = Math.floor(oVideoPlayer.currentTime);
    // 视频集
    if (!screen) {
      return; // 如果screen为null，则提前退出函数
    }
    let curDanmuList = (
      await listByEpisodeId({
        productId: realVideoId,
        episodeId: curEpisodeId.current,
        endTime: currentTime + 10,
        beginTime: currentTime,
      })
    ).data;

    curDanmuList?.map((item: any) => {
      screen.push({
        msg: item.content,
        head: item.head_img,
        color: "#eee",
        size: "small",
        backgroundColor: "rgba(2,2,2,.3)",
      });
    });
  }

  // 当播放器暂停的时候弹幕暂停
  const onPlayerPause = function (screen: any) {
    if (danmuTimer.current) clearInterval(danmuTimer.current);
    screen.pause();
  };

  // 当播放器播放时候渲染弹幕
  const onPlayerPlay = function (screen: any) {
    if (danmuTimer.current) clearInterval(danmuTimer.current);
    danmuTimer.current = setInterval(async () => {
      getDanmuData(screen);
    }, 10 * 1000);
    screen.resume();
  };

  // 当播放器好的时候初始化dom
  const onPlayerReady = function (player: any, screen: any) {
    if (isBrowser()) {
      oVideoPlayer = document.querySelector(
        "#video_wrapper div video"
      ) as HTMLVideoElement;
      // screen.clear();
      getDanmuData(screen);
      // 视频自动播放
      player.play();
      // 设置播放速度
      player.playbackRate(playBackRate);
      speed = true;
    }
  };

  return (
    <div
      className="screen relative overflow-x-auto  no-scrollbar"
      style={{ width: "92%", height: "80vh" }}
    >
      <div className="bottom-8 left-[40%] w-80 z-20 absolute ">
        <input value={bullet} onChange={handleChange} />
        <button onClick={() => handleSend(screen)}>发送</button>
        <button onClick={() => hideScreen()}>显示弹幕</button>
      </div>
      <video
        autoPlay
        ref={myPlay}
        controls
        style={{ height: "100%", width: "100%" }}
        className="video-js vjs-default-skin vjs-big-play-centered"
      />
    </div>
  );
});

export default MyPlayer;
