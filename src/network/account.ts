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
