/**
 * 弹幕逻辑配置
 */
import { useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  // 弹幕实例变量名
  const socket = useRef<any>(null);
  // 发送的弹幕
  const videoDanmuList = useRef<any[]>([]);

  const initialize = () => {
    // 建立传输链接 http://127.0.0.1:8081
    socket.current = io("ws://127.0.0.1:8081");
    socket.current.on("connect", () => {
      console.log("socketio已连接");
    });
    onBulletChat();
  };

  // 发送弹幕事件
  const handleAddDanmu = (data: any) => {
    socket.current.emit("bulletChat", data);
  };

  // 监听bulletChat事件
  const onBulletChat = () => {
    socket.current.on("message", (data: any) => {
      videoDanmuList.current.push(data);
    });
  };

  return {
    videoDanmuList,
    initialize,
    handleAddDanmu,
    onBulletChat,
  };
};

export default useSocket;
