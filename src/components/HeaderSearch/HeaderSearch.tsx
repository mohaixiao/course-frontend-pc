import Image from "next/image";

export default function HeaderSearch() {
  return (
    <div className="relative w-56">
      <div className="absolute flex align-center justify-center z-5 top-[5px] right-[7px]">
        <Image
          src="/images/svg/search.svg"
          alt="search"
          width={15}
          height={15}
        />
      </div>
      <input placeholder="请输入搜索内容" className="w-56 rounded-[118px] border-2" />
    </div>
  );
}
