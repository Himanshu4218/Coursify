"use client";

import Image from "next/image";
import { Suspense, useEffect } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Heading from "@/app/components/typography/Heading";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import CourseCategoryCard from "@/app/components/cards/CourseCategoryCard";
import UserCourseCard from "@/app/components/cards/UserCourseCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllCourses } from "@/redux/features/course/courseSlice";
import { getAllCategories } from "@/redux/features/category/categorySlice";

const Courses = () => {
  const { courses, isLoading } = useAppSelector((state) => state.course);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <div className="h-[80vh] w-full cursor-pointer flex justify-center gap-5 items-center lg:px-14 px-4">
        <div className="space-y-6 py-14 w-1/2 max-w-full my-auto">
          <h1 className="text-secondary text-2xl sm:text-4xl lg:text-6.5xl lg:leading-[70px]">
            Unleash Your Potential with Our Comprehensive
            <span className="font-bold block">Course Catalog</span>
          </h1>
        </div>
        <div className="relative w-1/2 h-full flex justify-center">
          <Image
            src={"/men.png"}
            width={500}
            height={500}
            alt="Home"
            className="h-full bottom-0 w-auto object-contain"
          />
        </div>
      </div>
      <WithContentWrapper>
        <div>
          <div className="w-full flex justify-center my-10">
            <div className="w-fit">
              <Heading label="Course categories" level={2} />
              <div className="h-[5px] mx-auto mt-2 bg-orange-500 w-20 rounded-b-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-0">
            <Suspense fallback={<CardShimmer size={6} />}>
              {categories.map((courseCategory, index) => (
                <CourseCategoryCard
                  key={index}
                  image={courseCategory.image}
                  title={courseCategory.name}
                  description={courseCategory.description}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </WithContentWrapper>
      <div className="bg-orangeLight w-full">
        <WithContentWrapper>
          <div className="w-fit mb-10">
            <Heading label="Browse all Courses" level={2} />
            <div className="h-[5px] mr-auto mt-2 bg-orange-500 w-20 rounded-b-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<CardShimmer size={6} />}>
              {courses.map((courseData, index) => (
                <Link href={"/courses/content-details"} key={index}>
                  <UserCourseCard
                    image={courseData.image}
                    category={courseData.category}
                    title={courseData.name}
                    description={courseData.description}
                    price={courseData.price}
                  />
                </Link>
              ))}
            </Suspense>
          </div>
          <button
            className="w-fit bg-white flex gap-4 items-center justify-between px-4 py-2 mx-auto my-10 rounded-full cursor-pointer"
            disabled={isLoading}
          >
            <span className="text-black text-lg font-semibold">Load more</span>
            <div className="bg-black rounded-full w-9 h-9 grid place-items-center p-1 transition-all transform hover:scale-[1.04]">
              <HiArrowNarrowRight color="white" size={20} />
            </div>
          </button>
        </WithContentWrapper>
      </div>
    </>
  );
};

export default Courses;
