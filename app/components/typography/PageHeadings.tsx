import React from "react";
import Heading from "./Heading";
import { TbReload } from "react-icons/tb";
import SearchInputs from "../input/SearchInputs";

interface PageHeadingProps {
  heading: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setReload?: () => void;
  value?: string;
  isLoading?: boolean;
}

const PageHeadings: React.FC<PageHeadingProps> = ({
  heading = "",
  onChange,
  value,
  setReload,
  isLoading = false,
}) => {
  const handleReload = () => {
    setReload && setReload();
  };

  return (
    <div className="flex justify-between relative flex-col sm:flex-row px-8 md:items-center items-start gap-3">
      <Heading label={heading} />
      {isLoading && (
        <div className="absolute w-full text-center pointer-events-none">
          <span className="px-4 py-2 bg-primaryDim rounded-md text-primary">
            Loading...
          </span>
        </div>
      )}
      <div className="flex items-center gap-2 ">
        {setReload && (
          <div
            className="size-9 hover:bg-gray-200 transition-all flex items-center justify-center rounded-[4px] cursor-pointer"
            title="Reload"
            onClick={handleReload}
          >
            <TbReload size={20} color="grey" />
          </div>
        )}
        <SearchInputs onChange={onChange} value={value || ""} />
      </div>
    </div>
  );
};

export default PageHeadings;
