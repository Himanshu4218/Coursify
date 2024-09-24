import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/buttons/Button";
import CourseOffers from "@/app/components/pages/home/CourseOffers";
import CourseCategories from "@/app/components/pages/home/CourseCategories";

const Page = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 px-14 py-8">
        <div className="w-full md:w-[60%] space-y-6">
          <h1 className="text-4xl md:text-6xl text-primary m-0 leading-0">
            Elevate Learning with
            <span className="font-bold block">Coursify</span>
          </h1>
          <h3 className="text-secondary text-xl md:text-2xl font-medium">
            Unlock Your Potential – Learn Anytime, Anywhere with Expert-Led
            Courses!
          </h3>
          <Link href={"/courses"}>
            <Button
              label="Explore Courses"
              variant="pillBasic"
              className="mt-6"
              textClass="text-lg md:text-xl"
            />
          </Link>
        </div>
        <div className="relative w-[60%] md:w-[40%]">
          <Image
            src={"/men.png"}
            width={500}
            height={500}
            className="w-full h-auto object-center object-contain"
            alt="men"
          />
        </div>
      </div>
      <CourseOffers />
      <CourseCategories />
    </>
  );
};

export default Page;
