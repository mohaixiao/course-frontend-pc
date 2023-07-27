/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Form, FormInstance, Input, message } from "antd";
import OAuth from "../OAuth/OAuth";
import RegisterSearch from "../Register/RegisterSearch";
import { useCallback, useRef } from "react";
import { sendCode } from "@/network/notify";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { changeToLogin } from "@/slices/loginSlice";
import { login } from "@/network/account";
import {
  changeIsLogin,
  changeToken,
  fetchUser,
  switchLoginState,
} from "@/slices/userSlice";

export const Captcha = () => {
  // 图形验证码获取
  let captchaSrc = useRef<any>();
  const [form] = Form.useForm<FormInstance<FormData>>();

  // 更新图形验证码
  const resetCaptchaSrc: () => void = () => {
    if (captchaSrc?.current?.src?.includes("&time")) {
      captchaSrc.current.src = captchaSrc?.current?.src?.replace(
        /&time=[0-9]*/,
        "&time=" + Date.now()
      );
    }
  };

  // 获取手机验证码
  const getCode = useCallback(async () => {
    const phone = form.getFieldValue("phone");
    const pcaptcha = form.getFieldValue("pcaptcha");

    // 手机号校验
    if (phone) {
      const phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!phoneReg.test(phone)) {
        message?.error("手机号码不合规");
        return false;
      }
    } else {
      message?.error("请输入手机号码");
      return false;
    }

    // 图形验证码
    if (!pcaptcha) {
      message?.error("请输入图形验证码");
      return false;
    }

    /**
     * 手机验证码接口逻辑
     */
    const data: any = await sendCode({
      phone,
      captcha: pcaptcha,
      type: "login",
    });
    if (data?.code === 0) {
      localStorage && localStorage.setItem("token", data.data.split(" ")[1]);
      dispatch(switchLoginState(data.data.split(" ")[1]));
      dispatch(fetchUser());
      message.success("发送手机验证码成功");
    } else {
      resetCaptchaSrc();
    }
    return true;
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  // 立即登录按钮
  const onLoginClick = async () => {
    const phone = form.getFieldValue("phone");
    const code = form.getFieldValue("code");
    if (!code) {
      message.error("请先发送手机验证码");
      return;
    }

    /**
     * 请求接口逻辑
     */
    const data: any = await login({
      phone: phone,
      code: code,
    });
    if (data.code === 0) {
      dispatch(changeToLogin(false));
      dispatch(changeIsLogin(true));
      message.success("登录成功！");
    } else {
      resetCaptchaSrc();
    }
  };

  return (
    <div>
      <Form autoComplete="off" form={form}>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "请输入手机号!" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        {/* 图形验证码 */}
        <Form.Item
          name="pcaptcha"
          className="inline-block"
          rules={[{ required: true, message: "请输入图形验证码!" }]}
        >
          <Input
            className="w-full"
            placeholder="请输入图形验证码"
            autoComplete="false"
          />
        </Form.Item>
        <img
          ref={captchaSrc as any}
          className="h-[30px]"
          src={`http://127.0.0.1:8081/api/notify/v1/captcha?type=login&time=${Date.now()}`}
          alt="图形验证码"
          onClick={resetCaptchaSrc}
        />

        {/* 手机验证码 */}
        <RegisterSearch getCode={getCode} />

        <Form.Item>
          <div className="flex items-center mt-[2px] text-[10px]">
            <p>登录即同意小滴课堂</p>
            <a className="ml-[4px] text-[#169bd5]" target="__blank">
              《隐私政策》
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="bg-[#4d555d] rounded-full rounded-5px text-center cursor-pointer select-none w-[300px] text-white h-[40px]"
            onClick={onLoginClick}
          >
            立即登录
          </button>
        </Form.Item>
      </Form>
      <OAuth type="login" />
    </div>
  );
};
