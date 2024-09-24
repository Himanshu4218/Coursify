"use client";

import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";
// import pdfImg from "@/public/assets/pdffile.png";
import img from "@/public/blog.png";
import { GrDownload } from "react-icons/gr";
import { RiPlayFill } from "react-icons/ri";
import { useState } from "react";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Heading from "@/app/components/typography/Heading";
import CourseContentCard from "@/app/components/pages/courses/CourseContentCard";
import Player from "@/app/components/pages/courses/Player";

const Page = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <WithContentWrapper className="bg-orangeLight">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6">
        <div className="space-y-8">
          <div className="h-96 border rounded-lg overflow-hidden relative">
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="w-12 h-12 bg-white z-10 rounded-full cursor-pointer grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <RiPlayFill size={30} />
              </div>
            )}
            <Player
              url={
                "https://videos.pexels.com/video-files/26214359/11939618_1920_1080_25fps.mp4"
              }
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              width="100%"
              height="auto"
            />
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl text-blackPrimary font-bold">
              Digital Marketing Course
            </h1>
            <p className="text-base font-normal">
              Provide most popular courses that your want to join and lets start
              the course for the most simply courses here you can build your
              career very smoothly most efficient services of thecommon courses,
              so you can learn here best engineering here
            </p>
          </div>
          <div className="bg-white p-7 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Skills to be learned</h2>
            <ul className="list-none space-y-4 text-base font-normal">
              <li>
                <RxDotFilled className="inline" />
                Understand the fundamentals of digital marketing and its
                strategic importance.
              </li>
              <li>
                <RxDotFilled className="inline" />
                Analyze digital marketing campaigns and optimize performance
                based on data insights.
              </li>
              <li>
                <RxDotFilled className="inline" />
                Develop and implement a comprehensive digital marketing
                strategy.
              </li>
              <li>
                <RxDotFilled className="inline" />
                Utilize key digital marketing tools and platforms effectively.
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 space-y-5">
          <Heading label="Course Content" className="text-2xl" />
          <div className="space-y-4 max-h-[515px] overflow-y-auto">
            <CourseContentCard
              title="Introduction to Digital Marketing"
              duration="02:20"
              img={img}
            />

            <CourseContentCard
              title="Introduction to Digital Marketing"
              duration="02:20"
              img={img}
            />

            <CourseContentCard
              title="Introduction to Digital Marketing"
              duration="02:20"
              img={img}
            />

            <CourseContentCard
              title="Introduction to Digital Marketing"
              duration="02:20"
              img={img}
            />

            <CourseContentCard
              title="Introduction to Digital Marketing"
              duration="02:20"
              img={img}
            />
            <div className="flex justify-start bg-primaryLight p-3 rounded-md gap-3">
              <div className="h-16 min-w-16">
                {/* <Image
                  src={pdfImg}
                  alt="image"
                  className="h-full w-full rounded-md"
                /> */}
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-xl font-medium">Content Marketing</h2>
                <h1 className="font-medium text-primary text-sm">
                  <GrDownload className="inline mr-2 font-semibold" />
                  Download pdf
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithContentWrapper>
  );
};

export default Page;
