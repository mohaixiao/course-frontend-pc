/* eslint-disable @next/next/no-img-element */
"use client";
import { Form, FormInstance, Input, message } from "antd";
import Image from "next/image";
import { changeToForget } from "@/slices/loginSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import RegisterSearch from "./RegisterSearch/RegisterSearch";
import { forget } from "@/network/account";
import { useCallback, useRef } from "react";
import { sendCode } from "@/network/notify";

const getCode = () => {};

const Forget: React.FC = () => {
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
      type: "change",
    });
    if (data?.code === 0) {
      message.success("发送手机验证码成功");
    } else {
      resetCaptchaSrc();
    }
    return true;
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  // 立即注册按钮
  const onChangeClick = async () => {
    const phone = form.getFieldValue("phone");
    const code = form.getFieldValue("code");
    const password = form.getFieldValue("newPassword");

    if (!code) {
      message.error("请先发送手机验证码");
      return;
    }

    /**
     * 请求接口逻辑
     */

    const data: any = await forget({
      phone: phone,
      code: code,
      password: password,
    });
    if (data.code === 0) {
      dispatch(changeToForget());
      message.success("修改密码成功！");
    } else {
      resetCaptchaSrc();
    }
  };

  const closeNow = () => {
    dispatch(changeToForget());
  };

  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 h-full bg-[#00000099]">
        <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto outline-none z-0 w-[400px] h-[350px] m-auto rounded-xl bg-white flex">
          <div className="flex justify-between w-full">
            <span className="pl-5 pt-5 text-[20px]  font-semibold text-[#404040]">
              重置密码
            </span>
            <Image
              src="/images/svg/close_icon.svg"
              className="cursor-pointer select-none w-[20px] h-[20px] pr-5 pt-5"
              alt="register"
              width={20}
              height={20}
              onClick={closeNow}
            />
          </div>
          <div className="flex justify-center items-center flex-col w-[80%] absolute left-8 top-14">
            <Form autoComplete="off" form={form}>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: "请输入手机号" }]}
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
                src={`http://127.0.0.1:8081/api/notify/v1/captcha?type=change&time=${Date.now()}`}
                alt="图形验证码"
                onClick={resetCaptchaSrc}
              />
              {/* 手机验证码 */}
              <RegisterSearch getCode={getCode} />
              {/* 图形验证码 */}
              <Form.Item
                name="newPassword"
                className="inline-block"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input.Password
                  className="w-full"
                  name="password"
                  placeholder="请输入新修改的密码"
                  autoComplete="false"
                />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="bg-[#4d555d] rounded-full rounded-5px text-center cursor-pointer select-none w-[300px] text-white h-[40px]"
                  onClick={onChangeClick}
                >
                  提交
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
