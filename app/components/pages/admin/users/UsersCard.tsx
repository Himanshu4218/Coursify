import React from "react";
import Image from "next/image";
import img from "@/public/assets/profile.jpg";

interface UserCardProps {
  first_name?: string;
  last_name?: string;
  email?: string;
  department?: string;
  image?: string;
}

const UsersCard: React.FC<UserCardProps> = ({
  first_name = "Zain",
  last_name = "Donin",
  email = "zaindonin1223@gmail.com",
  department = "Pharmalogy",
  image = ""
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[85px,1fr] gap-4 transition-all duration-300 rounded-md p-4 m-3 shadow-custom-light cursor-pointer hover:shadow-custom-medium">
      <div className="w-18 h-18 rounded-md">
        <Image className="rounded-md object-cover w-full" src={img} alt="img" />
      </div>
      <div className="list-none space-y-2 ">
        <li className="font-semibold text-base text-blackSecondary">
          {`${first_name || ""} ${last_name || ""}`}
        </li>
        <li className="text-greyPrimary break-words font-medium text-sm">
          {email}
        </li>
        <li className="flex justify-start text-sm flex-wrap gap-3">
          <span className="text-center text-primary bg-primaryDim rounded p-1 grow font-medium">
            {department}
          </span>
          <span className="text-center text-primary bg-primaryDim rounded p-1 grow font-medium">
            Clinical
          </span>
        </li>
      </div>
    </div>
  );
};

export default UsersCard;
