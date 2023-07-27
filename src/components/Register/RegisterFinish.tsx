"use client";

import { AppDispatch, RootState } from "@/store/store";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeToFinish } from "@/slices/registerSlice";

export default function RegisterFinish() {
  const { finish } = useSelector((state: RootState) => state.register);

  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = () => {
    dispatch(changeToFinish());
  };

  return (
    <Modal open={finish} centered footer={null} onCancel={handleCancel}>
      <div className="z-0 h-full flex flex-col justify-center items-center">
        <CheckCircleOutlined style={{ fontSize: "64px" }} />
        <h2 mb-4>恭喜你注册成功！</h2>
        <p mb-4 text-center>
          您现在可以使用手机号进行登录了!
        </p>
        <Button
          danger
          type="primary"
          size="large"
          className="mb-4"
          onClick={handleCancel}
        >
          开始学习
        </Button>
        <Button size="small" type="primary">
          完善资料
        </Button>
      </div>
    </Modal>
  );
}
