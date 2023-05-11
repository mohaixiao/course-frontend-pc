import Image from "next/image";
import { ReactElement } from "react";

interface RequireAuthProps {
  children: ReactElement;
}

export default function RegModal({ children }: RequireAuthProps) {
  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 h-full bg-slate-800">
        <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto outline-none z-0 w-[640px] h-[500px]  m-auto rounded-xl bg-white flex">
          {/* 背景图  */}
          <div className="after:container-[''] after:absolute after:w-60 after:h-full after:top-0 after:left-0 after:bg-[#00000099] w-60 h-full relative text-white flex flex-col bg-register-background bg-no-repeat z-10">
            <div className="absolute top-40 z-20 flex items-center flex-col">
              <Image
                src="/images/logo_footer.png"
                width={140}
                height={55}
                alt="logo"
              />
              <div className="mb-[10px] mt-[6px] w-[210px] border-[1px] border-b-[2px] border-white border-solid"></div>
              <span className="indent-4 pr-2 text-white text-[16px] font-semibold tracking-[10px] mr-2 text-center">
                让技术不再难学习
              </span>
            </div>
          </div>

          {/* 标题 / 关闭按钮  */}
          <div className="pt-[36px] px-[50px] flex flex-col w-[400px] relative">
            <div className="flex justify-between w-full">
              <span className="text-[20px]  font-semibold text-[#404040]">
                快速注册
              </span>
              <Image
                src="/images/svg/close_icon.svg"
                className="cursor-pointer select-none w-[20px] h-[20px]"
                alt="register"
                width={20}
                height={20}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
