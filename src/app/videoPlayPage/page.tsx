/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChapter } from "@/network/product";
import { getVideo } from "@/network/video";
import { useSearchParams } from "next/navigation";
import Player from "./Player";

const navList = [
  {
    title: "章节",
    img: "/images/zhangjie.png",
    imga: "/images/zhangjiea.png",
  },
];

interface Ref {
  current: number | undefined | null;
}

function Page() {
  const [expandShow, setExpandShow] = useState(false);
  const navSelect: Ref = useRef();
  const xdclassPlayer = useRef(null);
  const router = useRouter();

  const navClick = (val: number) => {
    if (navSelect?.current === val) {
      navSelect.current = -1;
      setExpandShow(!expandShow);
      return;
    } else {
      // 将选中的集展示再视口
      if (val === 0) {
        const oChapterSection = document.querySelector(
          ".chapter-section"
        ) as HTMLDivElement;
        setTimeout(() => {
          for (let i = 0; i < oChapterSection?.children.length; i++) {
            const chapter = oChapterSection?.children[i];
            for (let i = 0; i < chapter?.children[1]?.children?.length; i++) {
              const episode = chapter?.children[1]?.children[i];

              if (episode.classList.contains("selected")) {
                chapter.scrollIntoView({ behavior: "auto", block: "center" });
                document.body?.scrollIntoView();
                break;
              }
            }
          }
        });
      }
      setExpandShow(true);
      navSelect.current = val;
    }
  };

  const searchParams = useSearchParams();
  // 视频集
  const [_episodeId, setEpisodeId] = useState(Number(searchParams.get("eid")));
  // 当前id
  const realVideoId = Number(searchParams.get("id")) || 1;

  // 目录接口数据
  const [data, setData] = useState({ chapterList: [] });
  // const [chapterList, setChapterList] = useState();
  const getChapterList = async () => {
    const res = await getChapter(realVideoId);
    // setChapterList(res.data);
    setData({ ...data, chapterList: res.data });
    let episodeId = _episodeId || res.data[0].episodeList[0].id;
    setEpisodeId(episodeId);
  };

  const getVideoData = async (id: number) => {
    const res = await getVideo({ episodeId: id });
    if (res.code === 0) {
      setEpisodeId(id);
      router.push(`videoPlayPage?id=${realVideoId}&eid=${id}`);
      xdclassPlayer?.newPlayer(res.data.playResult);
    }
  };

  useEffect(() => {
    getChapterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-[#191917] absolute h-[87vh] top-[90px]" />
      <div className="h-[90vh] mr-[80px]">
        <div className="w-[140px] h-[87%] flex flex-col absolute top-[50%]">
          {navList?.map((item, index: any) => (
            <div
              key={index}
              className={`flex justify-start items-center flex-col p-[10px] text-[#aaa] cursor-pointer z-10 ${
                navSelect.current === index ? "bg-[#3b4046] text-[#fff]" : ""
              }`}
              style={{
                backgroundColor: `${
                  navSelect.current === index ? "#20201e" : ""
                }`,
              }}
              onClick={() => navClick(index)}
            >
              <img
                className="w-[26px] h-[28px]"
                alt=""
                src={`${navSelect.current === index ? item.imga : item.img}`}
              />
              <div className="mt-[5px] text-[16px] font-semibold">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        {expandShow && (
          <div className="z-10">
            {/* 章集  */}
            {
              <div className="cursor-pointer bg-[#20201e] text-[#fff] absolute top-[90px] left-[150px] h-[85%]">
                <div className="p-[10px] overflow-y-auto h-full no-scrollbar">
                  {data.chapterList &&
                    data.chapterList.map((item: any, index) => (
                      <div className="mb-[5px]" key={index}>
                        <div
                          className="w-[350px] whitespace-nowrap overflow-hidden text-ellipsis leading-8 text-[14px]-[#fff] mb-[5px]"
                          title={item.title}
                        >
                          第 {index + 1} 章&nbsp; {item.title}
                        </div>
                        <div className="ml-[20px] w-[350px]">
                          {item?.episodeList &&
                            item.episodeList.map(
                              (subItem: any, subIndex: any) => (
                                <div
                                  key={index}
                                  className={`overflow-hidden whitespace-nowrap text-ellipsis leading-8 mb-[5px] ${
                                    subItem.id == _episodeId
                                      ? "text-[#ec1500]"
                                      : ""
                                  }`}
                                  title={subItem.title}
                                >
                                  第 {subIndex + 1} 集 &nbsp;{subItem.title}
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            }
          </div>
        )}

        {/* 视频播放器 */}
        <div className="flex flex-col mr-[80px] flex-1">
          <div
            className="relative flex items-center w-full h-[97%]"
            id="video_wrapper"
            onClick={() => {
              navSelect.current = null;
            }}
          >
            <Player
              ref={xdclassPlayer}
              getVideoData={getVideoData}
              _episodeId={_episodeId}
              realVideoId={realVideoId}
              chapterList={data.chapterList}
            ></Player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
