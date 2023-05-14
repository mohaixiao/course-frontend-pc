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
