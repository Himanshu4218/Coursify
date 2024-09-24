"use client";
import { Suspense, useEffect, useState } from "react";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllCategories } from "@/redux/features/category/categorySlice";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Heading from "@/app/components/typography/Heading";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import CourseCategoryCard from "@/app/components/cards/CourseCategoryCard";
import Button from "@/app/components/buttons/Button";

interface userCategoryDataProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

const CourseCategories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="w-full">
      <WithContentWrapper>
        <div className="w-full flex justify-center mb-10">
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
        <div className="w-full flex md:flex-row flex-col items-center gap-5 justify-center shadow bg-light rounded-lg pt-10 px-6 mt-20">
          <div className="relative w-[60%] md:w-[50%]">
            <Image
              src={"/men.png"}
              width={500}
              height={500}
              className="w-full h-auto object-center object-cover"
              alt="men"
            />
          </div>
          <div className="md:[50%] text-center md:text-left w-[80%] space-y-10 my-auto pb-5">
            <h2 className="text-5xl text-secondary">
              Join For Your Success Now
            </h2>
            <p className="text-2xl text-secondary font-light">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
            <div className="w-full md:block flex justify-center">
              <Button label="Join Now" variant="pillBasic" />
            </div>
          </div>
        </div>
      </WithContentWrapper>
    </div>
  );
};

export default CourseCategories;
