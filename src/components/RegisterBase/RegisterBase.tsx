/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Checkbox, Form, Input, message } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { changeToBase, changeToFinish } from "@/slices/registerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useCallback, useRef } from "react";
import { FormInstance } from "antd/lib/form";
import RegisterSearch from "../RegisterSearch/RegisterSearch";
import { sendCode } from "@/network/notify";
import { register } from "@/network/account";

interface FormData {
  regPhone: string;
  regPCaptcha: string;
  accept: boolean;
}

export default function RegisterBase() {
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
    const regPhone = form.getFieldValue("regPhone");
    const regPCaptcha = form.getFieldValue("regPCaptcha");
    const regCode = form.getFieldValue("regCode");

    // 手机号校验
    if (regPhone) {
      const phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!phoneReg.test(regPhone)) {
        message?.error("手机号码不合规");
        return false;
      }
    } else {
      message?.error("请输入手机号码");
      return false;
    }

    // 图形验证码
    if (!regPCaptcha) {
      message?.error("请输入图形验证码");
      return false;
    }

    /**
     * 手机验证码接口逻辑
     */
    const data: any = await sendCode(regPhone, regPCaptcha, "register");
    if (data?.code === 0) {
      message.success("发送手机验证码成功");
    } else {
      resetCaptchaSrc();
    }
    return true;
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  // 立即注册按钮
  const onRegisterClick = async () => {
    const regPhone = form.getFieldValue("regPhone");
    const regCode = form.getFieldValue("regCode");
    const accept = form.getFieldValue("accept");

    if (!regCode) {
      message.error("请先发送手机验证码");
      return;
    }

    if (!accept) {
      message.error("请先同意协议");
      return;
    }

    /**
     * 请求接口逻辑
     */

    const data: any = await register({
      phone: regPhone,
      code: regCode,
    });

    console.log(data, "data");

    if (data.code === 0) {
      dispatch(changeToBase());
      dispatch(changeToFinish());
    } else {
      resetCaptchaSrc();
    }
  };

  return (
    <div className="mt-[20px]">
      <Form autoComplete="off" form={form}>
        <Form.Item
          name="regPhone"
          rules={[{ required: true, message: "请输入手机号!" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        {/* 图形验证码 */}
        <Form.Item
          name="regPCaptcha"
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
          src={`http://127.0.0.1:8081/api/notify/v1/captcha?type=register&time=${Date.now()}`}
          alt="图形验证码"
          onClick={resetCaptchaSrc}
        />

        {/* 手机验证码 */}
        <RegisterSearch getCode={getCode} />

        {/* 同意协议 */}
        <div className="flex items-center justify-between">
          <Form.Item name="accept" valuePropName="checked">
            <Checkbox>
              <div className="flex items-center text-[13px]">
                <div>同意小滴课堂</div>
                <Button
                  type="link"
                  size="small"
                  className="text-[13px] p-0 m-0 "
                  href="/"
                  color="#169bd5"
                >
                  《隐私策略》
                </Button>
              </div>
            </Checkbox>
          </Form.Item>
        </div>

        <Form.Item name="regCaptcha">
          <Button
            type="primary"
            htmlType="submit"
            block
            className="rounded-full bg-[#4d555d] text-center w- text-white cursor-pointer"
            onClick={onRegisterClick}
          >
            立即注册
          </Button>
        </Form.Item>
      </Form>

      {/* 微信注册登录方式  */}
      <div className="flex flex-col items-center justify-center">
        <span color="#555555">—更多登录方式—</span>
        <WechatOutlined style={{ fontSize: "32px" }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-auto h-[44px] flex bg-[#4d555d1a]">
        <span className="select-none m-auto z-10" color="#404040">
          已有账号？<span color="#5ebae2">登录</span>
        </span>
      </div>
    </div>
  );
}
