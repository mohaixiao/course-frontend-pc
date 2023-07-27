import request from "./index";

/**
 * 注册接口
 * @param options code:验证码 phone:手机号
 */

export const register = (options: { code: string; phone: string }) => {
  return request({
    url: "/user/v1/register",
    method: "post",
    data: { code: options.code, phone: options.phone },
  });
};

/**
 * 登录接口
 * @param options code:验证码 phone:手机号 password:密码
 */
export const login = (options: {
  phone: string;
  code?: string;
  password?: string;
}) => {
  return request({
    url: "/user/v1/login",
    method: "post",
    data: {
      code: options.code,
      phone: options.phone,
      password: options.password,
    },
  });
};

/**
 * 修改密码接口
 * @param options code:验证码 phone:手机号 password:密码
 */
export const forget = (options: {
  phone: string;
  code: string;
  password: string;
}) => {
  return request({
    url: "/user/v1/forget",
    method: "post",
    data: {
      code: options.code,
      phone: options.phone,
      password: options.password,
    },
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = function () {
  return request({
    url: "/user/v1/detail",
    method: "get",
  });
};

/**
 * 获取最近播放记录数据
 * @param params size: 每页条数, page: 页码
 */
export const getPlayRrecord = async function (params: {
  page: number;
  size: number;
}) {
  return request({
    url: "/user/v1/play_record",
    method: "post",
    data: params,
  });
};

/**
 * 修改个人信息
 */
export const updateUserInfo = async function (params: any) {
  return request({
    url: "/user/v1/update",
    method: "post",
    data: params,
  });
};

/**
 * 上报学习时长
 * @param params 请求参数 productId-视频ID episodeId-集ID duration-视频时长
 */
export const add = async function (params: {
  productId: number;
  episodeId: number;
  duration: number;
}) {
  return request({
    url: "/user/v1/duration_record",
    method: "post",
    data: params,
  });
};
