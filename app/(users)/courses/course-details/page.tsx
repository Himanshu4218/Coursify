import Image from "next/image";
import { IoIosGlobe } from "react-icons/io";
import { AiOutlineFilePdf } from "react-icons/ai";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { GrCertificate, GrDocumentPdf } from "react-icons/gr";
import { RiFolderVideoFill, RiPlayFill } from "react-icons/ri";
import img from "@/public/marketing.jpg";
// import video from "@/public/assets/profilepic11.webp";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Button from "@/app/components/buttons/Button";

const page = () => {
  return (
    <div className="bg-orangeLight">
      <WithContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-[620px,1fr] gap-6">
          <div className="rounded-md w-full md:w-full h-[180px] sm:h-[200px] md:h-[400px] ">
            <Image
              src={img}
              width={500}
              height={500}
              alt="Digital Marketing"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div className="space-y-5 ">
            <h1 className="text-4xl font-extrabold text-start pt-4">
              Digital Marketing Course
            </h1>
            <p className="font-normal text-base">
              Provide most popular courses that your want to join and lets start
              the course for the most simply courses here you can build your
              career very smoothly most efficient services of thecommon courses,
              so you can learn here best engineering here
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 mdm:grid-cols-2 xl:grid-cols-4 text-sm gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 grid place-items-center rounded-sm ">
                  <IoIosGlobe size={15} color="" />
                </div>
                <span className="font-normal text-[14px] min-w-max">
                  English
                </span>
              </div>
              <div className="flex items-center gap-2 ">
                <div className="w-5 grid place-items-center h-5  rounded-sm">
                  <RiFolderVideoFill size={15} />
                </div>
                <span className="font-normal text-[14px] min-w-max">
                  20 Video Lectures
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 grid place-items-center  rounded-sm">
                  <PiMicrosoftPowerpointLogoFill size={15} />
                </div>
                <span className="font-normal text-[14px] min-w-max">
                  10 Presentations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 grid place-items-center h-5  rounded-sm">
                  <AiOutlineFilePdf size={15} />
                </div>
                <span className="font-normal text-[14px] min-w-max">
                  15 Documents
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 grid place-items-center h-5 rounded-sm">
                  <GrCertificate size={15} />
                </div>
                <span className="font-normal text-[14px] min-w-max">
                  Certificate on completion
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold pt-2 text-[#FF9A08]">
              $20.00
            </h1>
            <div className="grid grid-cols-2">
              <div className="flex gap-x-3 pt-2">
                <Button
                  label="Add to cart"
                  variant="basic"
                  className="min-w-max"
                />
                <Button
                  label="Buy Now"
                  variant="blackBasic"
                  className="min-w-max"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-md mt-10 w-full">
          <div>
            <h1 className="font-extrabold text-2xl">Skills to be learned</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mt-4 mx-2">
              <li className="text-base">
                Understand the fundamentals of digital marketing and its
                strategic importance.
              </li>
              <li>
                Analyze digital marketing campaigns and optimize performance
                based on data insights.
              </li>
              <li>
                Develop and implement a comprehensive digital marketing
                strategy.
              </li>
              <li>
                Utilize key digital marketing tools and platforms effectively.
              </li>
            </div>
          </div>
          <h1 className="font-extrabold text-2xl mt-12 mb-8">Course content</h1>
          <div className="space-y-3">
            <div className="flex justify-between min-w-full bg-mainBg rounded-md">
              <div className=" p-3 w-full min-h-[75px] flex items-center  ">
                <div className="relative min-w-14 h-14">
                  <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="Video lecture"
                    className="w-full h-full object-fill rounded-md"
                  />
                  <div className="w-6 h-6  cursor-pointer grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RiPlayFill color="white" size={16} />
                  </div>
                </div>
                <p className="pl-4 font-semibold text-[15px] md:text-[20px]">
                  Introduction to Digital Marketing
                </p>
              </div>
              <div className="flex items-center p-3">
                <p className="text-primary">2:20</p>
              </div>
            </div>
            <div className="flex justify-between bg-mainBg rounded-md">
              <div className=" p-3 w-full h-[75px] flex items-center  ">
                <div className="relative *:min-w-14 h-14">
                  <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="Video lecture"
                    className="w-full h-full object-contain rounded-md"
                  />
                  <div className="w-6 h-6  cursor-pointer grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RiPlayFill color="white" size={16} />
                  </div>
                </div>
                <p className="pl-4 font-semibold text-[15px] md:text-[20px]">
                  Search Engine Optimization (SEO)
                </p>
              </div>
              <div className="flex items-center p-3">
                <p className="text-primary">2:20</p>
              </div>
            </div>
            <div className="flex justify-between bg-mainBg rounded-md">
              <div className=" p-3 w-full h-[75px] flex items-center  ">
                <div className="min-w-14 h-14 relative">
                  <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="Video lecture"
                    className="w-full h-full object-contain rounded-md"
                  />
                  <div className="w-6 h-6  cursor-pointer grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RiPlayFill color="white" size={16} />
                  </div>
                </div>
                <p className="pl-4 font-semibold text-[15px] md:text-[20px]">
                  Pay Per Click Advertising (PPC)
                </p>
              </div>
              <div className="flex items-center p-3">
                <p className="text-primary">2:20</p>
              </div>
            </div>
            <div className="flex justify-between bg-mainBg rounded-md">
              <div className=" p-3 w-full h-[75px] flex items-center  ">
                <div className="relative min-w-14 h-14">
                  <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="Video lecture"
                    className="w-full h-full object-contain rounded-md"
                  />
                  <div className="w-6 h-6  cursor-pointer grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <RiPlayFill color="white" size={16} />
                  </div>
                </div>
                <p className="pl-4 font-semibold text-[15px] md:text-[20px]">
                  Social Media Marketing (SMM)
                </p>
              </div>
              <div className="flex items-center p-3">
                <p className="text-primary">2:20</p>
              </div>
            </div>
            <div className="flex justify-between bg-mainBg rounded-md">
              <div className=" p-3 w-full h-[75px] flex items-center  ">
                <div className="w-14 h-14 text-red-500">
                  <GrDocumentPdf size={50} />
                </div>
                <p className="pl-4 font-semibold text-[15px] md:text-[20px]">
                  Content Marketing
                </p>
              </div>
            </div>
          </div>
        </div>
      </WithContentWrapper>
    </div>
  );
};

export default page;
