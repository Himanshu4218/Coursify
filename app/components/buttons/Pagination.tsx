import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface PaginationProps {
  changePages: (direction: "next" | "prev" | number) => void;
  currentPage: number | string;
  totalPages: number;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  changePages,
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
}) => {
  const currentPageNumber =
    typeof currentPage === "string" ? parseInt(currentPage) : currentPage;

  return (
    <div className="flex justify-between items-center px-4">
      <div></div>
      <div className="flex items-center gap-3 disabled">
        <button
          disabled={isLoading}
          className="rotate-180 bg-transparent rounded-md text-primary border border-primary py-2 px-2 cursor-pointer disabled:opacity-60 hover:bg-primary hover:text-white transition-all"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            changePages("prev")
          }
        >
          <FaArrowRightLong />
        </button>

        <button
          disabled={isLoading || currentPage === totalPages}
          className="bg-primary rounded-md flex items-center justify-center gap-3 mx-auto w-fit py-2 text-white transition-all px-4 cursor-pointer disabled:opacity-60 hover:bg-purple-900"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            changePages("next")
          }
        >
          <span className="text-sm">Next Page</span>
          <FaArrowRightLong />
        </button>
      </div>

      <div className="text-blackPrimary text-sm font-semibold space-x-1">
        <span>Page</span>
        <span>
          <input
            type="number"
            className="w-12 pl-1 border-2 border-primary rounded-[4px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = Number(e.target.value);
              changePages(value);
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              let value = Number(e.target.value);
              if (value <= 1 || isNaN(value)) {
                changePages(1);
              }
            }}
            value={currentPage}
            defaultValue={currentPage}
            min="1"
          />
        </span>
        <span>of</span>
        <span>{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
