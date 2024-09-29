"use client";

import Image from "next/image";
import { Suspense, useCallback, useEffect } from "react";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getAllCategories,
  increment,
} from "@/redux/features/category/categorySlice";
import CourseCategoryCard from "@/app/components/cards/CourseCategoryCard";
import { HiArrowNarrowRight } from "react-icons/hi";

const Categories = () => {
  const { isLoading, categories, page, limit, hasMore } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  useEffect(() => {
    console.log("hello");
    dispatch(getAllCategories({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <WithContentWrapper className="space-y-16 mb-10">
      <div className="lg:min-h-[300px] min-h-[450px] cursor-pointer course-categories-bg  flex lg:flex-row flex-col justify-center lg:justify-between gap-5 lg:items-end course-bg-home lg:px-14 px-4">
        <div className="space-y-6 py-14 lg:w-1/2 max-w-full my-auto">
          <h1 className="font-medium text-2xl sm:text-4xl lg:text-4.5xl lg:leading-[60px] text-blackPrimary">
            Discover Versatile Marketing Courses for Today&apos;s Business
            Landscape
          </h1>
        </div>
        <div className="lg:min-w-[280px] lg:h-[280px] min-w-[150px] h-[150px]">
          <Image
            src={"/men.png"}
            width={200}
            height={200}
            alt="men"
            className="h-full w-full bg-transparent object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
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
        }
      </div>
      {hasMore && (
        <button
          onClick={handleClick}
          className="bg-orangeLight w-fit flex gap-4 items-center justify-between px-4 py-2 mx-auto my-10 rounded-full"
          disabled={isLoading}
        >
          <span className="text-black text-lg font-semibold">Load more</span>
          <div className="bg-black rounded-full w-9 rotate-90 h-9 grid place-items-center p-1 transition-all transform hover:scale-[1.04]">
            <HiArrowNarrowRight color="white" size={20} />
          </div>
        </button>
      )}
    </WithContentWrapper>
  );
};

export default Categories;
