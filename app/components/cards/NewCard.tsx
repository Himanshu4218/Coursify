"use client";

import React from "react";
import Link from "next/link";
import { TbSquareRoundedPlus } from "react-icons/tb";

interface NewCardProps {
  onClick?: (value: boolean) => void;
  path?: string;
  title: string;
  description: string;
}

const NewCard: React.FC<NewCardProps> = ({
  onClick,
  path,
  title = "",
  description = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(true);
    }
  };

  const content = (
    <div
      className="flex gap-4 items-center shadow-custom-light bg-white p-5 cursor-pointer rounded-md w-fit max-w-1/3"
      onClick={handleClick}
    >
      <div className="text-primary bg-gray-200 min-w-16 h-16 text-2xl rounded-full grid place-items-center">
        <TbSquareRoundedPlus />
      </div>
      <div className="">
        <h1 className="leading-10 font-semibold text-xl min-w-max">{title}</h1>
        <p className="font-normal text-xs text-greySecondary">{description}</p>
      </div>
    </div>
  );

  return path ? <Link href={path}>{content}</Link> : content;
};

export default NewCard;
