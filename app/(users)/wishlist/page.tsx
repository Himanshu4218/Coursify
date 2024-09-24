import Image from "next/image";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Heading from "@/app/components/typography/Heading";

const page = () => {
  return (
    <WithContentWrapper className="bg-orangeLight pb-10">
      <div className=" md:pl-4">
        <Heading label="Wish List" level={2} />
        <div className="h-[5px] bg-orange-500 w-20 rounded-b-lg mt-2"></div>
      </div>
      <div className="grid  md:grid-cols-1 xl:grid-cols-2 gap-8 md:mx-4 mt-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl">
          <div className=" sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
            <Image
              src={"/image.png"}
              width={200}
              height={200}
              alt="course"
              className="object-contain rounded-md w-full h-full"
            />
          </div>
          <div className="bg-white rounded-md pl-3">
            <div className="flex justify-between items-center gap-x-5">
              <div className="mt-2">
                <h1 className="font-semibold text-[20px]">
                  Digital Marketing Course
                </h1>
                <p className="font-normal text-[14px] text-greyPrimary">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
              <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
                <span className="bg-primary rounded-md p-1 cursor-pointer">
                  <MdArrowOutward size={22} color="white" />
                </span>
                <span className="text-red-600 bg-gray-50 rounded-md  p-1">
                  <RiDeleteBin6Line size={22} />
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
                $20.00
              </h1>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl">
          <div className=" sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
            <Image
              src={"/image1.png"}
              width={200}
              height={200}
              alt="course"
              className="object-contain rounded-md w-full h-full"
            />
          </div>
          <div className="bg-white rounded-md pl-3">
            <div className="flex justify-between items-center gap-x-5">
              <div className="mt-2">
                <h1 className="font-semibold text-[20px]">
                  Digital Marketing Course
                </h1>
                <p className="font-normal text-[14px] text-greyPrimary">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
              <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
                <span className="bg-primary rounded-md p-1 cursor-pointer">
                  <MdArrowOutward size={22} color="white" />
                </span>
                <span className="text-red-600 bg-gray-50 rounded-md  p-1">
                  <RiDeleteBin6Line size={22} />
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
                $20.00
              </h1>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-[200px,1fr] p-4 bg-white rounded-xl">
          <div className=" sm:min-h-10 sm:min-w-18 rounded-md min-w-44 min-h-32">
            <Image
              src={"/image3.png"}
              width={200}
              height={200}
              alt="course"
              className="object-contain rounded-md w-full h-full"
            />
          </div>
          <div className="bg-white rounded-md pl-3">
            <div className="flex justify-between items-center gap-x-5">
              <div className="mt-2">
                <h1 className="font-semibold text-[20px]">
                  Digital Marketing Course
                </h1>
                <p className="font-normal text-[14px] text-greyPrimary">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
              <div className="flex flex-col items-start gap-y-2 justify-center mt-3">
                <span className="bg-primary rounded-md p-1 cursor-pointer">
                  <MdArrowOutward size={22} color="white" />
                </span>
                <span className="text-red-600 bg-gray-50 rounded-md  p-1">
                  <RiDeleteBin6Line size={22} />
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold pt-2 text-[#FF9A08]">
                $20.00
              </h1>
            </div>
          </div>
        </div>
      </div>
    </WithContentWrapper>
  );
};

export default page;
