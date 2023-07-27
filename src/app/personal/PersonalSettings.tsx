/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Card, Button, Form, Input, Radio, message } from "antd";
import { updateUserInfo } from "@/network/account";
import { fetchUser } from "@/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const PersonalSettings = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const { personalInfo } = useSelector((state: RootState) => state.user);
  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    form.setFieldsValue(personalInfo);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  /**
   * 保存
   */
  const save = async () => {
    const formData = form.getFieldsValue();
    const data: any = await updateUserInfo({ ...formData });
    if (data?.code == 0) {
      dispatch(fetchUser());
      setComponentDisabled(true);
      message.success("保存成功");
    }
  };

  return (
    <Card title="个人详情" size="default">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="昵称" name="username">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value={0}> 女 </Radio>
            <Radio value={1}> 男 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="城市" name="city">
          <Input placeholder="请输入城市" />
        </Form.Item>
        <Form.Item label="签名" name="slogan">
          <Input placeholder="请输入签名" />
        </Form.Item>
      </Form>
      {componentDisabled ? (
        <Button className="ml-16" onClick={() => setComponentDisabled(false)}>
          编辑
        </Button>
      ) : (
        <div>
          <Button className="ml-16" onClick={() => save()}>
            保存
          </Button>
          <Button className="ml-4" onClick={() => setComponentDisabled(true)}>
            取消
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PersonalSettings;
