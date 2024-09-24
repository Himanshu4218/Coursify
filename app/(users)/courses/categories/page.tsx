"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import courses from "@/app/data/courses.json";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import UserCourseCard from "@/app/components/cards/UserCourseCard";

interface userCourseDataProps {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
}

const Categories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userCourseData, setUserCourseData] =
    useState<userCourseDataProps[]>(courses);

  // const getUserCourseData = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const url = `${ENDPOINTS.GET_USER_COURSE_DATA}?per_page=`;
  //     const response = await getRequest(url);
  //     if (response?.data?.data) {
  //       setUserCourseData(response?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching user category data", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   getUserCourseData();
  // }, []);

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
            width={500}
            height={500}
            alt="Home"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          <Suspense fallback={<CardShimmer size={6} />}>
            {userCourseData &&
              userCourseData.map((courseData, index) => (
                <UserCourseCard
                  key={index}
                  image={courseData.image}
                  category={courseData.category}
                  title={courseData.title}
                  description={courseData.description}
                  price={courseData.price}
                />
              ))}
          </Suspense>
        }
      </div>
    </WithContentWrapper>
  );
};

export default Categories;
