/**
 * @params getWechat 获取微信二维码接口
 * @params watchScan 轮询接口监听用户是否扫码
 */

import request from "./index";

export const getWechat = async () => {
  return request({
    url: "/wx_login/v1/login",
    method: "get",
  });
};

export const watchScan = async (ticket: string) => {
  return request({
    url: "/wx_login/v1/check_scan",
    method: "get",
    params: { ticket },
  });
};
