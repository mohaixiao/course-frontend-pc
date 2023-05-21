import Header from "@/components/Header";
import Banner from "./Banner";
import Classify from "./Classify";
import UserInformation from "./UserInformation";

export default async function Home() {
  return (
    <>
      <Header />
      <div className="w-[1200px] min-w-[1200px] mx-auto">
        <div className="flex justify-betwwen items-center h-[400px]">
          {/* 分类  */}
          <div className="">
            <Classify />
          </div>
          {/* 轮播图  */}
          <div className="px-4 grow-5 rounded-xl">
            <Banner />
          </div>
          {/* 个人信息  */}
          <div className="">
            <UserInformation />
          </div>
        </div>
      </div>
    </>
  );
}
