"use client";

import dynamic from "next/dynamic";
import useHookStore from "@/app/store/useHookStore";
import { useCallback, useEffect, useState } from "react";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import { getRequest } from "@/app/utils/apis/apiRequests";
const CourseContentCard = dynamic(() => import("../../../../../components/pages/admin/courses/CourseContentCard"));
const ViewCourseCard = dynamic(() => import("../../../../../components/pages/admin/courses/ViewCourseCard"));
const AddDocuments = dynamic(() => import("../../../../../components/pages/admin/courses/AddDocuments"));
const AddPresentations = dynamic(() => import("../../../../../components/pages/admin/courses/AddPresentations"));
const AddLecture = dynamic(() => import("../../../../../components/pages/admin/courses/AddLecture"));

interface CourseContentDataProps {
  course_name: string;
  category_name: string;
  description: string;
  price: string | number;
  course_image: string;
  duration: string | number;
  skills: string[];
  language: string;
  videos: any;
  documents: any;
  presentations: any;
}

const ViewCourse = ({ params }: { params: { courseId: string } }) => {
  const [courseData, setCourseData] = useState<CourseContentDataProps | null>(
    null
  );
  const [isReload, setIsReload] = useState<boolean>(true);

  const { modalState, setModalState } = useHookStore();

  const getCourseById = useCallback(async () => {
    const url = `${ENDPOINTS.GET_COURSE_BY_ID}/${params?.courseId}`;
    const response = await getRequest(url);
    if (response?.data) {
      setCourseData(response?.data);
    } else {
      console.error("No data found in the response");
    }
  }, []);

  useEffect(() => {
    getCourseById();
  }, [getCourseById, isReload]);

  return (
    <>
      <div className="space-y-4">
        <ViewCourseCard
          courseCategory={courseData?.category_name ?? ""}
          courseName={courseData?.course_name ?? ""}
          price={courseData?.price ?? ""}
          language={courseData?.language ?? ""}
          description={courseData?.description ?? ""}
          skills={courseData?.skills ?? []}
          videos={courseData?.videos ?? []}
          documents={courseData?.documents ?? []}
          presentations={courseData?.presentations ?? []}
        />

        {courseData && (
          <CourseContentCard
            setReload={() => setIsReload((prev) => !prev)}
            courseData={courseData}
          />
        )}
      </div>
      <AddLecture
        setReload={() => setIsReload((prev) => !prev)}
        courseId={params?.courseId}
      />
      <AddDocuments
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
