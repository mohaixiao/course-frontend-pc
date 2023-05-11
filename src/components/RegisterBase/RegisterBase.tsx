import { Button, Checkbox, Form, Input } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function RegisterBase() {
  return (
    <div className="mt-[20px]">
      <Form autoComplete="off">
        <Form.Item
          name="reg"
          rules={[{ required: true, message: "请输入手机号!" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        {/* 图形验证码 */}
        <Form.Item
          name="regPCaptcha"
          rules={[{ required: true, message: "请输入图形验证码!" }]}
        >
          <Input
            className="w-3/5"
            placeholder="请输入图形验证码"
            autoComplete="false"
          />
          <Image
            className="inline-block"
            width={40}
            height={30}
            src=""
            alt=""
          />
        </Form.Item>

        {/* 手机验证码 */}
        <Form.Item
          name="regCaptcha"
          rules={[{ required: true, message: "请输入手机号或邮箱验证码!" }]}
        >
          <Input className="w-3/5" placeholder="请输入手机号或邮箱验证码" />
          <Button>获取验证码</Button>
        </Form.Item>

        {/* 同意协议 */}
        <div className="flex items-center justify-between">
          <Form.Item name="accept">
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
      <div className="absolute bottom-0 left-0 w-[400px] h-[44px] flex bg-[#4d555d1a]">
        <span className="select-none m-auto z-10" color="#404040">
          已有账号？<span color="#5ebae2">登录</span>
        </span>
      </div>
    </div>
  );
}
