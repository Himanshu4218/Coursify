import React from "react";
import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchInputs: React.FC<SearchInputProps> = ({ onChange, value }) => {
  return (
    <div className="border-2 rounded-md flex p-2 border-greyMedium bg-white w-full md:max-w-[300px] justify-between">
      <input
        type="text"
        placeholder="Search"
        value={value}
        className="outline-none placeholder:text-greyMedium"
        onChange={onChange}
      />
      <LuSearch className="text-xl text-greyMedium" />
    </div>
  );
};

export default SearchInputs;
