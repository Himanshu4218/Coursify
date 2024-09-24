import React from "react";
import Button from "../buttons/Button";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";

interface UserCardType {
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
}

const UserCourseCard = ({
  image,
  category,
  title,
  description,
  price,
}: UserCardType) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden relative h-[340px] shadow transition-all cursor-pointer hover:shadow-lg hover:scale-[1.01] duration-500">
      <div className="w-8 h-8 grid place-items-center z-30 rounded-full absolute top-4 left-5">
        <IoMdHeart size={22} color="white" />
      </div>
      <div className="px-3 py-2 text-xs font-semibold tracking-wide rounded-3xl absolute top-4 right-5 bg-orange-500 text-white z-30">
        <span>{category}</span>
      </div>
      <div className="relative w-full h-full">
        <Image
          src={image}
          width={300}
          height={150}
          className="w-full h-auto object-cover object-center"
          alt="image"
        />
      </div>
      <div className="space-y-2 p-4 rounded-t-xl w-full border absolute bottom-0 bg-white">
        <h1 className="text-xl font-extrabold">{title}</h1>
        <p className="font-normal text-xs">{description}</p>
        <div className="h-[2px] bg-greyLight w-full" />
        <div className="flex items-center justify-between">
          <span className="text-orange-500 text-2xl font-extrabold">
            ${price}
          </span>
          <Button label="Add to cart" className="w-fit py-2 font-normal" />
        </div>
      </div>
    </div>
  );
};

export default UserCourseCard;
