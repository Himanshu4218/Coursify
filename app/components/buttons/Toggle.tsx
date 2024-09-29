"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface ToggleProps {
  className?: string;
  options: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isDangerous?: boolean;
  }[];
}

const Toggle: React.FC<ToggleProps> = ({ options, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className={twMerge(
          "w-full flex justify-center cursor-pointer mt-1 text-gray-500",
          className
        )}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <IoEllipsisVertical color="white" size={20} />
      </button>
      {isOpen && (
        <div
          className="absolute top-full right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          role="menu"
          aria-labelledby="toggle-button"
        >
          <ul className="text-xs">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-slate-100 transition ${
                  option.isDangerous ? "bg-red-100 text-red-500" : ""
                }`}
                onClick={option.onClick}
                role="menuitem"
              >
                <span className="flex items-center gap-2 min-w-max">
                  {option.icon}
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Toggle;
