import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export default function RegisterFinish() {
  return (
    <Modal className="w-[350px]! ">
      <div className="flex flex-col justify-center items-center">
        <CheckCircleOutlined style={{ fontSize: "32px" }} />
        <h2 mb-4>恭喜你注册成功！</h2>
        <p mb-4 text-center>
          您现在可以使用手机号进行登录了!
        </p>
        <Button danger type="primary" size="large" mb-4>
          开始学习
        </Button>
        <Button type="text" size="small">
          完善资料
        </Button>
      </div>
    </Modal>
  );
}
