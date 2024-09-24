"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import courseCategory from "@/app/data/courseCategory.json";
import courses from "@/app/data/courses.json";
import Heading from "@/app/components/typography/Heading";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import CourseCategoryCard from "@/app/components/cards/CourseCategoryCard";
import UserCourseCard from "@/app/components/cards/UserCourseCard";
import Link from "next/link";

interface userCategoryDataProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface userCourseDataProps {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
}

const Courses = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [userCategoryData, setUserCategoryData] =
    useState<userCategoryDataProps[]>(courseCategory);

  const [userCourseData, setUserCourseData] =
    useState<userCourseDataProps[]>(courses);

  // const getUserCategoryData = useCallback(async () => {
  //     try {
  //         setLoading(true);
  //         const url = ENDPOINTS.GET_USER_CATEGORY_DATA;
  //         const response = await getRequest(url);
  //         console.log("response", response?.data?.data);
  //         if (response?.data?.data) {
  //             setUserCategoryData(response?.data?.data);
  //         }
  //     } catch (error) {
  //         console.log("Error while fetching user category data", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // }, []);

  // useEffect(() => {
  //     getUserCategoryData();
  // }, []);

  // const getUserCourseData = useCallback(async () => {
  //     try {
  //         setLoading(true);
  //         const url = `${ENDPOINTS.GET_USER_COURSE_DATA}?per_page=10`;
  //         const response = await getRequest(url);
  //         if (response?.data?.data) {
  //             setUserCourseData(response?.data?.data);
  //         }
  //     } catch (error) {
  //         console.log("Error while fetching user category data", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // }, []);

  // useEffect(() => {
  //     getUserCourseData();
  // }, []);

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
              {userCategoryData &&
                userCategoryData.map((courseCategory, index) => (
                  <CourseCategoryCard
                    key={index}
                    image={courseCategory.image}
                    title={courseCategory.title}
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
              {userCourseData &&
                userCourseData.map((courseData, index) => (
                  <Link href={"/courses/content-details"} key={index}>
                    <UserCourseCard
                      image={courseData.image}
                      category={courseData.category}
                      title={courseData.title}
                      description={courseData.description}
                      price={courseData.price}
                    />
                  </Link>
                ))}
            </Suspense>
          </div>
          <div className="w-fit bg-white flex gap-4 items-center justify-between px-4 py-2 mx-auto my-10 rounded-full cursor-pointer">
            <span className="text-black text-lg font-semibold">Load more</span>
            <div className="bg-black rounded-full w-9 h-9 grid place-items-center p-1 transition-all transform hover:scale-[1.04]">
              <HiArrowNarrowRight color="white" size={20} />
            </div>
          </div>
        </WithContentWrapper>
      </div>
    </>
  );
};

export default Courses;
