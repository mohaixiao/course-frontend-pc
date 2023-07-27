import type { ProductList } from "@/types/api";
import Image from "next/image";

interface IProps {
  cardTag: ProductList;
}

const convertLevel = (level: string) => {
  switch (level) {
    case "JUNIOR":
      return "初级";
    case "MIDDLE":
      return "中级";
    case "SENIOR":
      return "高级";
    default:
      return "未知";
  }
};

const CardTag = ({ cardTag }: IProps) => {
  return (
    <div className="px-[10px] pt-[10px] pb-[10px]">
      <div className="text-[14px] leading-[16px] text-[#404040] h-[32px] w-[260px] break-all text-ellipsis overflow-hidden">
        {cardTag?.title}
      </div>
      <div className="flex text-[14px] text-[#7f7f7f] mt-[5px] items-center">
        <div mr-12px>级别：{convertLevel(cardTag?.course_level)}</div>
        <span className="ml-[4px] flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((item) => (
            <Image
              key={item}
              className="mr-[4px]"
              src="/images/fire.png"
              width={14}
              height={14}
              alt="fire"
            />
          ))}
        </span>
      </div>
      <div className="flex justify-between items-center mt-[5px]">
        <span className=" text-[16px] text-[#7f7f7f]">
          观看人数：
          {cardTag?.uv}
        </span>
        <div className="flex items-center justify-center">
          <div color="#aaaaaa">
            ¥
            <span className="text-[14px] mr-[5px] line-through">
              {cardTag?.old_amount}
            </span>
          </div>
          <div color="#e51b11">
            ¥<span className="text-[16px] mt-[-5px]">{cardTag.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTag;
