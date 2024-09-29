"use client";

import AddDocuments from "@/app/components/pages/admin/courses/AddDocuments";
import AddLecture from "@/app/components/pages/admin/courses/AddLecture";
import AddPresentations from "@/app/components/pages/admin/courses/AddPresentations";
import CourseContentCard from "@/app/components/pages/admin/courses/CourseContentCard";
import ViewCourseCard from "@/app/components/pages/admin/courses/ViewCourseCard";
import { getCourseById } from "@/redux/features/course/courseByIdSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCallback, useEffect, useState } from "react";

const ViewCourse = ({ params }: { params: { courseId: string } }) => {
  const { course } = useAppSelector((state) => state.courseById);
  const [isReload, setIsReload] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const onOpen = (value: boolean) => {
    setIsReload(value);
  };

  useEffect(() => {
    dispatch(getCourseById({ id: params.courseId }));
  }, [dispatch, params.courseId]);

  return (
    <>
      <div className="space-y-4">
        {course && (
          <ViewCourseCard
            img={course?.image}
            courseCategory={course?.category}
            courseName={course?.name}
            price={course?.price}
            language={course?.language}
            description={course?.description}
            skills={course?.skills}
            videos={[]}
            documents={[]}
            presentations={[]}
          />
        )}

        {course && (
          <CourseContentCard
            setReload={() => setIsReload((prev) => !prev)}
            courseData={course}
          />
        )}
      </div>
      <AddLecture
        setReload={() => setIsReload((prev) => !prev)}
        courseId={params?.courseId}
      />
      <AddDocuments
        onOpen={onOpen}
        setReload={() => setIsReload((prev) => !prev)}
        courseId={params?.courseId}
      />
      <AddPresentations
        setReload={() => setIsReload((prev) => !prev)}
        courseId={params?.courseId}
      />
    </>
  );
};

export default ViewCourse;
