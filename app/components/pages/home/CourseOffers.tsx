"use client";
import { Suspense, useEffect, useState } from "react";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Heading from "@/app/components/typography/Heading";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import UserCourseCard from "@/app/components/cards/UserCourseCard";
import { getAllCourses } from "@/redux/features/course/courseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";

interface userCourseDataProps {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
}

const CourseOffers = () => {
  const { courses, isLoading } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCourses({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="bg-orangeLight">
      <WithContentWrapper>
        <div className="space-y-6">
          <div>
            <Heading
              level={2}
              label="Revise a wide range of course offerings."
            />
            <div className="h-[5px] mt-2 bg-orange-500 w-16 rounded-b-lg" />
          </div>
          <p className="text-blackSecondary font-normal text-base">
            At Turitor, we believe everyone should have the opportunity to
            create progress through technology and develop the skills of
            tomorrow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<CardShimmer size={6} />}>
              {courses.map((courseData, index) => (
                <Link
                  href={`/admin/courses/view-course/${courseData._id}`}
                  key={index}
                >
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
        </div>
      </WithContentWrapper>
    </div>
  );
};

export default CourseOffers;
