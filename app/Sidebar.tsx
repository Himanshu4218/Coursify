"use client";

import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { navItems } from "./utils/constants/data";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      {!isOpen && (
        <span
          className="lg:hidden absolute top-5 left-6 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu size={30} />
        </span>
      )}
      <aside
        className={`fixed inset-0 bg-[#F9FAFB] z-40 -translate-x-full transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : ""
        }`}
      >
        <span
          className="absolute right-5 top-5 cursor-pointer text-[#1E40AE] font-thin"
          onClick={() => setIsOpen(false)}
        >
          <RxCross2 size={30} />
        </span>
        <h1 className="font-bold text-[#1E40AE] text-center py-4 text-4xl">
          Coursify
        </h1>
        <div className="flex flex-col h-[calc(100vh-72px)] py-4 justify-between items-center text-[#1E40AE]">
          <ul className="w-[95%]">
            {navItems.map((link, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-col gap-5 text-center py-4 rounded text-2xl hover:text-white hover:bg-[#1E40AE] transition-all duration-100 cursor-pointer text-[#1E40AE] font-medium"
                >
                  {link}
                </li>
              );
            })}
          </ul>
          {!userInfo?.accessToken && (
            <div className="w-[95%] flex flex-col gap-4">
              <Link href={"/auth/register"}>
                <button
                  className="w-full bg-[#1E40AE] text-white py-4 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </button>
              </Link>
              <Link href={"/auth/login"}>
                <button
                  className="w-full text-[#1E40AE] bg-white py-4 rounded border border-[#1E40AE]"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
