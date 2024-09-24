import dynamic from "next/dynamic";
import React from "react";
import Image, { StaticImageData } from "next/image";
import img from "@/public/assets/landscape.jpg";

const PiMicrosoftPowerpointLogoFill = dynamic(() =>
  import("react-icons/pi").then((mod) => mod.PiMicrosoftPowerpointLogoFill)
);
const IoIosGlobe = dynamic(() =>
  import("react-icons/io").then((mod) => mod.IoIosGlobe)
);
const AiOutlineFilePdf = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiOutlineFilePdf)
);
const FcVideoCall = dynamic(() =>
  import("react-icons/fc").then((mod) => mod.FcVideoCall)
);

interface ViewCourseCardProps {
  // img:StaticImageData,
  courseName: string;
  courseCategory: string;
  description: string;
  price: number | string;
  enrolledStudents?: number;
  skills: string[];
  language: string;
  videos: string[];
  documents: string[];
  presentations: string[];
}

const ViewCourseCard: React.FC<ViewCourseCardProps> = ({
  // img,
  courseName,
  courseCategory,
  description,
  price,
  language,
  enrolledStudents,
  skills,
  videos,
  documents,
  presentations,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] bg-white py-1 px-5  rounded-md place-items-center">
      <div className="rounded-md relative">
        <Image
          src={img}
          alt="image"
          className="rounded-md object-contain"
          priority
        />
        <div className="absolute text-white rounded-md bottom-0 w-2/3 p-2 backdrop-blur-2xl">
          <span>1750 Students Enrolled</span>
        </div>
      </div>
      <div className="mx-3 my-1 py-3 space-y-3">
        <div className="flex justify-between ">
          <div>
            <h1 className="font-semibold text-lg">{courseName}</h1>
            <li className="list-none text-sm font-medium text-greyPrimary">
              {courseCategory}
            </li>
          </div>
          <h1 className="text-3xl font-semibold text-[#FF9A08]">${price}</h1>
        </div>
        <div className=" flex gap-3 items-center">
          <span className="font-medium text-[15px]">Skills:</span>
          <div className="flex justify-start items-center gap-3 flex-wrap">
            {skills?.length > 0
              ? skills?.map((skill: string, ind: number) => (
                  <span
                    key={ind}
                    className="bg-primaryDim text-primary py-1 px-2 font-medium rounded-md text-[13px]"
                  >
                    {skill}
                  </span>
                ))
              : ""}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="font-medium text-[15px]">Features:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 mdm:grid-cols-2 xl:grid-cols-4 text-sm gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 ">
              <div className="w-5 grid place-items-center h-5 bg-gray-100 rounded-sm">
                <FcVideoCall size={15} />
              </div>
              <span className="font-medium text-[13px] min-w-max">
                {videos?.length} Video Lectures
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 grid place-items-center h-5 bg-gray-100 rounded-sm">
                <AiOutlineFilePdf size={15} className="text-red-500" />
              </div>
              <span className="font-medium text-[13px] min-w-max">
                {documents?.length} Documents
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 grid place-items-center rounded-sm bg-gray-100">
                <IoIosGlobe size={15} className="text-primary" />
              </div>
              <span className="font-medium text-[13px] min-w-max">
                {language}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 grid place-items-center bg-gray-100 rounded-sm">
                <PiMicrosoftPowerpointLogoFill
                  size={15}
                  className="text-red-500"
                />
              </div>
              <span className="font-medium text-[13px] min-w-max">
                {presentations?.length} Presentations
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-[15px] font-medium text-greySecondary">
            <span className="text-blackPrimary">Description: </span>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseCard;
