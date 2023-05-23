import type { ProductList } from "@/types/api";

interface IProps {
  card: ProductList;
}

const Card = async ({ card }: IProps) => {
  return (
    <div>
      <h3 className="mt-[5px] ml-[12px] mr-[17px] mb-[4px] text-[14px] text-[#404040] font-normal">
        {card.title}
      </h3>
    </div>
  );
};

export default Card;
