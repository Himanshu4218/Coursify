import Heading from "@/app/components/typography/Heading";
import Image from "next/image";
import React from "react";
import { RiFolderVideoFill } from "react-icons/ri";
import { IoIosGlobe } from "react-icons/io";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Button from "@/app/components/buttons/Button";

const page = () => {
  return (
    <WithContentWrapper className="bg-orangeLight pb-10">
      <div className="">
        <Heading label="My Learning" level={2} />
        <div className="h-[5px] bg-orange-500 w-20 rounded-b-lg mt-2"></div>
      </div>
      <div className="grid  grid-cols-1  gap-8 md:mx-4 mt-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-[250px,1fr] bg-white rounded-xl">
          <div className=" w-full h-[250px] md:w-64 md:h-52 rounded-md ">
            <Image
              src={"/blog1.png"}
              width={300}
              height={300}
              alt="course"
              className="aspect-square rounded-md w-full h-full"
            />
          </div>
          <div className="bg-white rounded-r-md pl-3 flex flex-col justify-between">
            <div>
              <div className="mt-2">
                <h1 className="font-z text-[20px]">Digital Marketing Course</h1>
                <p className="font-normal text-[14px] text-secondary">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>

              <div className="flex flex-wrap justify-between gap-y-3 mt-3 mr-3">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 grid place-items-center rounded-sm">
                    <IoIosGlobe size={15} />
                  </div>
                  <span className="font-normal text-[14px] min-w-max">
                    English
                  </span>
                </div>
                <div className="flex items-center gap-2 ">
                  <div className="w-5 grid place-items-center h-5  rounded-sm">
                    <RiFolderVideoFill size={15} />
                  </div>
                  <span className="font-normal text-[14px] min-w-max">
                    20 Video Lectures
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="w-5 h-5 grid place-items-center  rounded-sm">
                    <PiMicrosoftPowerpointLogoFill size={15} />
                  </div>
                  <span className="font-normal text-[14px] min-w-max">
                    10 Presentations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 grid place-items-center h-5  rounded-sm">
                    <AiOutlineFilePdf size={15} />
                  </div>
                  <span className="font-normal text-[14px] min-w-max">
                    15 Documents
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 grid place-items-center h-5 rounded-sm">
                    <GrCertificate size={15} />
                  </div>
                  <span className="font-medium text-[13px] min-w-max">
                    Certificate on completion
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center">
              <div className="h-2.5 my-4 w-full md:w-3/4 flex flex-row items-center gap-3">
                <div className="h-3 w-full bg-purple-300 rounded-md">
                  <div className="w-2/3 h-full bg-purple-600 rounded-md"></div>
                </div>
                <div>0%</div>
              </div>
              <div className="mb-3 md:m-3">
                <Button
                  label="Start Learning"
                  variant="basic"
                  className="min-w-max font-medium text-[14px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithContentWrapper>
  );
};

export default page;
