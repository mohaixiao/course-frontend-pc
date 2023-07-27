interface IProps {
  text: string;
}

import Image from "next/image";

const Blank = ({ text }: IProps) => {
  return (
    <div className="flex items-center justify-center flex-col mb-[50px]">
      <Image src="/images/blank_img.png" width={256} height={256} alt="blank" />
      <p text-16px color="#4d555d">
        {text}
      </p>
    </div>
  );
};

export default Blank;
