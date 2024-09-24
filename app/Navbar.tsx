"use client";

import Link from "next/link";
import Search from "./components/search/Search";
import Sidebar from "./Sidebar";
import Avatar from "react-avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useState } from "react";
import axios from "./utils/apis/axios";
import { data } from "@/app/data/allCourses";
import { logoutUser } from "@/redux/features/user/userSlice";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await axios.get("/api/users/logout", {
      withCredentials: true,
    });
    dispatch(logoutUser({ accessToken: "", persist: false }));
    localStorage.setItem("persist", JSON.stringify(false));
  };

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow">
      <div className="lg:w-[90%] w-[85%] mx-auto ml-[60px] flex justify-between items-center text-[#1E40AE]">
        <Sidebar />
        <div className="flex gap-10 items-center">
          <Link href="/">
            <h1 className="text-4xl font-bold">Coursify</h1>
          </Link>
          <nav className="hidden lg:block">
            <Link href={"/courses/categories"}>
              <div className="cursor-pointer text-lg font-medium">
                Categories
              </div>
            </Link>
          </nav>
        </div>
        <Search data={data} />
        {auth?.accessToken ? (
          <nav className="hidden lg:block">
            <ul className="flex items-center xl:gap-4 lg:gap-3 gap-2">
              <Link href={"/courses"}>
                <li>Courses</li>
              </Link>
              <Link href={"/certificate"}>
                <li>Certificates</li>
              </Link>
              <Link href={"/mylearning"}>
                <li className="whitespace-nowrap">My Learnings</li>
              </Link>
            </ul>
          </nav>
        ) : (
          <div className="lg:flex gap-2 hidden">
            <Link href={"/auth/login"}>
              <button className="text-[#1E40AE] bg-white py-[6px] px-4 rounded border border-[#1E40AE]">
                Login
              </button>
            </Link>
            <Link href={"/auth/register"}>
              <button className="border border-[#1E40AE] bg-[#1E40AE] text-white py-[6px] px-4 rounded">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {auth?.accessToken && (
          <div className="relative">
            <Avatar
              name="Foo Bar"
              size="40"
              className="cursor-pointer rounded-full"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg overflow-hidden shadow-lg">
                <Link href={"/user-profile"}>
                  <p
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Profile
                  </p>
                </Link>
                <hr className="border-t" />
                <Link href={"/wishlist"}>
                  <p
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Wishlist
                  </p>
                </Link>
                <hr className="border-t" />
                <p
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
