"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FcVideoCall } from "react-icons/fc";
import { IoIosGlobe } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { AiOutlineFilePdf } from "react-icons/ai";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

interface courseCardProps {
  title: string;
  category_name: string;
  price: number;
  skills: string[];
  description: string;
  course_image: string;
  duration: number;
  courseId: string | number;
  setReload?: () => void;
}

const CourseCard: React.FC<courseCardProps> = ({
  title,
  category_name,
  price,
  skills,
  description,
  courseId,
  course_image,
  duration,
  setReload,
}) => {
  const [modalState, setModalState] = useState<boolean>(false);

  const onOpen = (value: boolean) => {
    setModalState(value);
  };

  const router = useRouter();

  const options = [
    {
      label: "View Course",
      icon: <LuEye />,
      onClick: () => router.push(UrlHelper.toViewCourse(courseId)),
      // onClick: () => {},
    },
    {
      label: "Edit Course",
      icon: <FiEdit3 />,
      onClick: () => router.push(UrlHelper.toEditCourse(courseId)),
      // onClick: () => {},
    },
    {
      label: "Remove Course",
      icon: <RxCross1 />,
      //   onClick: () => handleDeleteCourse(),
      isDangerous: true,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow-custom-light space-y-3 relative">
      <div className="w-full aspect-[2.5/1]">
        <Image
          src={course_image}
          width={100}
          height={100}
          alt="image"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="">
        <div className="flex justify-between items-center gap-2">
          <div>
            <span className="font-semibold text-lg">{title}</span>
            <li className="text-sm font-medium list-none text-greyPrimary">
              {category_name || DEFAULT_MSG}
            </li>
          </div>
          <h1 className="text-3xl font-semibold text-[#FF9A08]">
            ${price || 0}
          </h1>
        </div>
      </div>
      <div className="flex gap-3">
        <span className="font-medium text-[15px]">Skills:</span>
        <div className="flex justify-start items-center gap-3 flex-wrap">
          {skills?.length > 0 ? (
            skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-primaryDim text-primary py-1 px-2 font-medium rounded-sm text-[13px]"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm font-medium list-none text-greyPrimary">
              {DEFAULT_MSG}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <h1 className="font-medium text-[15px]">Features:</h1>
        <div className="flex flex-wrap text-sm gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 ">
            <div className="w-5 grid place-items-center h-5 bg-gray-100 rounded-sm">
              <FcVideoCall size={15} />
            </div>
            <span className="font-medium text-[13px] min-w-max">
              20 Video Lectures
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 grid place-items-center h-5 bg-gray-100 rounded-sm">
              <AiOutlineFilePdf size={15} className="text-red-500" />
            </div>
            <span className="font-medium text-[13px] min-w-max">
              15 Documents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 grid place-items-center rounded-sm bg-gray-100">
              <IoIosGlobe size={15} className="text-primary" />
            </div>
            <span className="font-medium text-[13px] min-w-max">English</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 grid place-items-center bg-gray-100 rounded-sm">
              <PiMicrosoftPowerpointLogoFill
                size={15}
                className="text-red-500"
              />
            </div>
            <span className="font-medium text-[13px] min-w-max">
              10 Presentations
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-[15px] font-medium text-greySecondary">
          <span className="text-blackPrimary">Description: </span>
          {description || DEFAULT_MSG}
        </p>
      </div>
      <div className="text-greyPrimary absolute top-6 right-10 bg-greyDim w-9 h-9 grid place-items-center rounded-md cursor-pointer">
        <Toggle options={options} />
      </div>
    </div>
  );
};

export default CourseCard;
