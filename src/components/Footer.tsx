"use client";
import { message, Divider } from "antd";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-[#fbfbfb]">
      <div className="w-full flex justify-center items-center">
        <div   className="w-[1200px] flex justify-center items-center mt-[10px]">
          <Image src="/images/logo.png" width={150} height={100} alt="" />
          <div className="text-[16px] text-[#4f555d] flex-col font-normal shrink-0">
            <div mb-10px>
              <a
                onClick={() => message.error("敬请期待")}
                className="mr-[29px]"
              >
                网站地图
              </a>
              <a
                onClick={() => message.error("敬请期待")}
                className="mr-[29px]"
              >
                每日福利
              </a>
              <a href="#" mr-29px>
                联系讲师
              </a>
              <a
                onClick={() => message.error("敬请期待")}
                className="mr-[29px]"
              >
                APP下载
              </a>
            </div>
            <div className="flex justify-center items-center">
              友情链接：
              <a target="__blank" href="https://xiaodijy.tmall.com/">
                小滴天猫旗舰店&nbsp;&nbsp;
              </a>
              |&nbsp;&nbsp;
              <a target="__blank" href="https://open1024.com/">
                Open1024技术导航站&nbsp;&nbsp;
              </a>
              |&nbsp;&nbsp;
              <a
                target="__blank"
                href="https://www.aliyun.com/minisite/goods?taskPkg=amb618all&pkgSid=356821&recordId=3651796&userCode=r5saexap"
              >
                阿里云&nbsp;&nbsp;
              </a>
              |&nbsp;&nbsp;
              <a target="__blank" href="https://xdclass.ke.qq.com/">
                腾讯课堂
              </a>
            </div>
          </div>
          <div className="flex shrink-0">
            <Image
              src="/images/xdclass_gzh.png"
              width={80}
              height={80}
              alt=""
              className="mr-[16px]"
            />
            <div className="flex justify-center flex-col text-[18px] font-light text=[#4f555d]">
              <p>扫码关注</p>
              <p>微信服务号</p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-center items-center text-[12px] text-[#7f7f7f] pb-[10px]">
        Copyright © 2018 Company,lnc.
        <a
          href="https://www.beian.gov.cn/"
          className="text-[#7f7f7f] hover:text-[#f38e48]"
        >
          &nbsp;粤ICP备15092968号&nbsp;
        </a>
        Terms
      </div>
    </div>
  );
};

export default Footer;
