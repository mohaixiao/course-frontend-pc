"use client";
import { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = () => {
  const myPlay = useRef(null);

  return (
    <video
      ref={myPlay}
      controls
      style={{ height: "100%", width: "100%" }}
      className="video-js vjs-default-skin vjs-big-play-centered"
    />
  );
};

export default Player;
