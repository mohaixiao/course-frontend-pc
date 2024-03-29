/* eslint-disable @next/next/no-img-element */
import CardTag from "./CardTag";
import Card from "./Card";
import type { ProductList } from "@/types/api";
import Link from "next/link";

interface IProps {
  choiceCard: number;
  card: ProductList;
}

const CardBase = ({ choiceCard, card }: IProps) => {
  return (
    <Link href={`/videoDetailsPage?id=${card?.id}`}>
      <div
        className="w-[280px] flex flex-col rounded-xl mt-[10px] mb-[20px] shadow-md"
        cursor-pointer
      >
        <div className="relative">
          <img
            src={card?.cover_img}
            className="w-full cursor-pointer rounded-lg rounded-r-lg"
            // height={190}
            // width={280}
            alt="card_cover"
          />
        </div>
        <div className="flex flex-col text-[12px]">
          {/* 详细介绍  */}
          <div className={`${choiceCard === 0 && "hidden"}`}>
            <CardTag cardTag={card} />
          </div>
          {/* 标题  */}
          <div className={`${choiceCard === 1 && "hidden"}`}>
            <Card card={card} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBase;
