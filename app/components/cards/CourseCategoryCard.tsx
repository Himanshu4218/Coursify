import Image from "next/image";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

interface CourseCategoryCard {
  image: string;
  title: string;
  description: string;
}

const CourseCategoryCard: React.FC<CourseCategoryCard> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="w-full h-[300px] rounded-lg morphism-bg backdrop-blur-lg shadow-morphism overflow-hidden relative col-span-1">
      <div className="width-1/2 h-[150px] absolute top-0 right-0">
        <Image
          src={image}
          width={150}
          height={150}
          className="w-full h-full object-cover object-center"
          alt="img"
        />
      </div>

      <div className="absolute left-0 bottom-0 space-y-2 p-4 max-w-[80%]">
        <h2 className="text-xl font-extrabold max-w-[70%] text-nowrap">
          {title}
        </h2>
        <p className="text-xs font-medium">{description}</p>
        <h3 className="text-base font-semibold flex items-center">
          Explore Courses
          <MdArrowOutward />
          <span className="font-semibold">
            <MdArrowOutward />
          </span>
        </h3>
      </div>
    </div>
  );
};

export default CourseCategoryCard;
