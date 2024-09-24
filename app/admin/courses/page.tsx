"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import NewCard from "@/app/components/cards/NewCard";
import PageHeadings from "@/app/components/typography/PageHeadings";
import Pagination from "@/app/components/buttons/Pagination";

interface CaourseTypes {
  data: {
    id: string | number;
    category_id: number;
    category_name: string;
    course_image: string;
    course_name: string;
    description: string;
    price: string;
    skills: string[];
    durations: string;
    total_sold: string;
  }[];
  last_page: number;
}

const Cources = () => {
  const [page, setPage] = useState<number | string>(1);
  const [courses, setCourses] = useState<CaourseTypes | null>(null);
  const [searchCourses, setSearchCourses] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(true);

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

  //   useEffect(() => {
  //     getAllCourses(debouncedSearchCategories, Number(page || 1));
  //   }, [page, debouncedSearchCategories, isReload]);

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
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<CardShimmer size={3} />}>
          {courses?.data &&
            (courses.data.length > 0 ? (
              courses?.data?.map((course) => (
                <CourseCard
                  key={course.id}
                  setReload={() => setIsReload((prev) => !prev)}
                  courseId={course?.id}
                  category_name={course.category_name}
                  course_image={course.course_image}
                  title={course.course_name}
                  description={course.description}
                  price={Number(course.price)}
                  skills={course.skills}
                  duration={Number(course.durations)}
                />
              ))
            ) : (
              <span>No Record Found</span>
            ))}
        </Suspense>
      </div> */}
      <Pagination
        changePages={changePages}
        currentPage={page}
        totalPages={courses?.last_page ? courses.last_page : 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Cources;
