import request from "./index";

/**
 * 发送手机短信验证码
 * @param phone 手机号
 * @param captcha 图形验证码
 * @param type 场景
 */

export const sendCode = (options: {
  phone: string;
  captcha: string;
  type: "register" | "login" | "change";
}) => {
  return request({
    url: "/notify/v1/send_code",
    method: "post",
    data: {
      phone: options.phone,
      captcha: options.captcha,
      type: options.type,
    },
  });
};
