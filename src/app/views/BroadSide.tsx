"use client";
import { useMemo, useRef, useState } from "react";

const BroadSide = () => {
  const [account, setAccount] = useState(false);
  const [indexShow, setIndexShow] = useState<number>();
  const [flag, setFlag] = useState(false);

  const width = useRef(
    (document.documentElement.clientWidth || document.body.clientWidth) >
      1200 + 10 + 120
  );

  const onMouseenter = (i: number) => {
    if (!flag && !width.current) return;
    setIndexShow(i);
    setAccount(true);
  };

  const onMouseleave = () => {
    if (!flag && !width.current) return;
    setAccount(false);
  };

  const data = useMemo(() => {
    if (!width.current) {
      return ["点", "击", "我", "查", "看"];
    } else {
      return ["每日福利", "公众号", "联系讲师", "APP下载", "帮助中心"];
    }
  }, [width?.current]);

  return (
    <div
      className="h-[250px]"
      onMouseEnter={() => (width.current = true)}
      onMouseLeave={() => (width.current = false)}
    >
      BroadSide
    </div>
  );
};

export default BroadSide;
