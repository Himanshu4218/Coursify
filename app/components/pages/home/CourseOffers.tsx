"use client";
import { Suspense, useState } from "react";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Heading from "@/app/components/typography/Heading";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import UserCourseCard from "@/app/components/cards/UserCourseCard";
import Courses from "@/app/data/courses.json";

interface userCourseDataProps {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
}

const CourseOffers = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [userCourseData, setUserCourseData] =
    useState<userCourseDataProps[]>(Courses);

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
  // }, [getUserCourseData]);

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
          </div>
        </div>
      </WithContentWrapper>
    </div>
  );
};

export default CourseOffers;
