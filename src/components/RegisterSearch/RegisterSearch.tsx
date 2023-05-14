import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";
import useCountDown from "@/hooks/countDown";

interface Props {
  getCode: Function;
}

export default function RegisterSearch({ getCode }: Props) {
  const [countDown, setCountDown] = useState<number>();
  const formattedRes = useCountDown({ targetDate: countDown });

  const onSearch = () => {
    let result: boolean = getCode();
    if (!result) return;
    setCountDown(() => Date.now() + 60 * 1000);
  };

  return (
    <Form.Item
      name="regCode"
      rules={[{ required: true, message: "请输入手机号或邮箱验证码!" }]}
    >
      <Space direction="horizontal">
        <Input placeholder="请输入手机号或邮箱验证码" />
        <Button
          style={{ width: 100 }}
          onClick={onSearch}
          disabled={formattedRes.seconds !== 0}
        >
          {formattedRes.seconds !== 0
            ? `${formattedRes.seconds}秒后重发`
            : "获取验证码"}
        </Button>
      </Space>
    </Form.Item>
  );
}
