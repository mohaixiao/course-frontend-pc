"use client";
import { message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { changeToLogin } from "@/slices/loginSlice";
import { getVideoMaterialsData } from "@/slices/materialsSlice";
import { useState } from "react";
import Image from "next/image";
import { isBrowser } from "@/utils/getEnv";

const Materials = ({ center, id }: { center: boolean; id: number }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useSelector((state: RootState) => state.login);
  const { isLogin } = useSelector((state: RootState) => state.user);
  // 资料状态管理
  const { bdZipUrl, noteUrl } = useSelector(
    (state: RootState) => state.materials
  );

  // 资料下载点击
  const showModal = async () => {
    if (!isLogin) {
      message.error("请先登录");
      dispatch(changeToLogin(true));
      return;
    }
    // 请求资料接口获取地址
    dispatch(getVideoMaterialsData(id));

    if (bdZipUrl) {
      setVisible(true);
    } else {
      message.error("没有权限");
    }
  };

  // 关闭下载弹窗
  const handleOk = () => {
    setVisible(false);
  };

  // 笔记点击跳转
  const noteClick = async () => {
    if (!isLogin) {
      message.error("请先登录");
      dispatch(changeToLogin(true));
      return;
    }

    dispatch(getVideoMaterialsData(id));

    if (noteUrl) {
      isBrowser() && window.open(noteUrl, "_blank");
    } else {
      message.error("没有权限");
    }
  };

  return (
    <div className={`${center ? "center" : "materials"}`}>
      <div className="note">
        <Image src="/images/note.png" height={83} width={83} alt="" />
        <div className="text-[16px] text-[#666666] mt-[7px] mb-[12px]">
          老师笔记
        </div>
        <span
          className="w-[99px] h-[28px] text-[#4d555d] rounded-[5px] text-center cursor-pointer leading-[26px]"
          onClick={noteClick}
        >
          查看
        </span>
      </div>
      <div className="note">
        <Image src="/images/materials.png" height={83} width={83} alt="" />
        <div text-16px color="#666666" mt-7px mb-12px>
          课程资料
        </div>
        <span
          onClick={showModal}
          className=" w-[99px]
          h-[28px]
          text-[#4d555d]
          rounded-[5px]
          text-center
          cursor-pointer
          leading-[26px]"
        >
          下载
        </span>
      </div>
      <Modal title="下载" open={visible} onOk={() => handleOk()} footer="null">
        <div>
          <div>百度云</div>
          <div>
            <div>
              地址：
              <a href={bdZipUrl?.split("||")[0]}>{bdZipUrl?.split("||")[0]}</a>
            </div>
            <div>密码：{bdZipUrl?.split("||")[1]}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Materials;
