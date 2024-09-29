"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import NewCard from "@/app/components/cards/NewCard";
import PageHeadings from "@/app/components/typography/PageHeadings";
import Pagination from "@/app/components/buttons/Pagination";
import CourseCard from "@/app/components/pages/admin/courses/CourseCard";
import { getAllCourses } from "@/redux/features/course/courseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Cources = () => {
  const [page, setPage] = useState<number | string>(1);
  const [searchCourses, setSearchCourses] = useState<string>("");
  const [isReload, setIsReload] = useState<boolean>(true);
  const { isLoading, courses } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  //FOR CHANGE PAGES
  const changePages = useCallback(
    (directionOrPage: "next" | "prev" | number) => {
      if (directionOrPage === "prev") {
        setIsLoading(false);
      }
      setPage((prevPage) => {
        if (directionOrPage === 0) return "";

        if (typeof directionOrPage === "number") return directionOrPage;

        if (typeof prevPage === "string") return 1;
        return directionOrPage === "next"
          ? prevPage + 1
          : Math.max(prevPage - 1, 1);
      });
    },
    [page]
  );

  useEffect(() => {
    dispatch(getAllCourses({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="space-y-7">
      <NewCard
        title="Add New Course"
        description="You can categorize courses and list multiple courses under each category."
        path={"/admin/courses//course/add"}
      />
      <PageHeadings
        heading="All Courses"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchCourses(e.target.value)
        }
        setReload={() => setIsReload((prev) => !prev)}
        value={searchCourses}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<CardShimmer size={3} />}>
          {courses?.map((course) => (
            <CourseCard
              key={course._id}
              setReload={() => setIsReload((prev) => !prev)}
              courseId={course?._id}
              category_name={course.category}
              course_image={course.image}
              title={course.name}
              description={course.description}
              price={Number(course.price)}
              skills={course.skills}
              duration={Number(14)}
            />
          ))}
        </Suspense>
      </div>
      <Pagination
        changePages={changePages}
        currentPage={page}
        totalPages={1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Cources;
