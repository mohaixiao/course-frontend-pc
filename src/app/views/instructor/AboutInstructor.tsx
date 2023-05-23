import Instructor from "./Instructor";
import Image from "next/image";
import { getTeacherList } from "@/network/teacher";

const AboutInstructor = async () => {
  const data = (await getTeacherList()).data;

  return (
    <div className="about-instructor" w-full>
      <div className="flex items-center">
        <div className="flex items-center">
          <Image
            src="/images/svg/jsjs.svg"
            className=" mr-[5px]"
            height={20}
            width={29}
            alt="teacher"
          />
          <h2 className="text-[16px] text-[#4f555d]">讲师介绍</h2>
        </div>
      </div>
      <div className="h-[350px] w-[1200px] mt-[8px] flex flex-wrap items-center justify-betwwen">
        {data.slice(0, 4).map((item: any) => (
          <Instructor
            key={item.id}
            name={item.name}
            avatar={item.head_img}
            description={item.profile}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutInstructor;
