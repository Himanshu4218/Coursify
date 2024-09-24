import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/typography/Heading";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";

const Certificate = () => {
  return (
    <div className="bg-orangeLight pb-10">
      <WithContentWrapper>
        <div className="pb-8">
          <Heading label="Your Certificate" level={2} />
          <div className="h-[5px] bg-orange-500 w-20 rounded-b-lg mt-2"></div>
          <p className="font-normal text-xl text-greyPrimary mt-3">
            2 Certificates in your List
          </p>
        </div>
        <div className="divide-y-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[180px,1fr] pt-4 border-white">
            <div className=" w-full md:w-44 h-auto">
              <Image
                src={"/blog.png"}
                width={400}
                height={400}
                alt="Certificate"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col justify-between ml-4">
                <div>
                  <h1 className="font-medium text-xl mt-3 md:mt-0">
                    Digital Marketing Course
                  </h1>
                  <p className="font-normal text-base mt-1 mb-2">
                    Completed on June 30, 2024
                  </p>
                </div>
                <div className="flex items-center gap-3 cursor-pointer md:mb-3">
                  <span>
                    <FaRegEye />
                  </span>
                  <p className="text-primary text-base font-extrabold ">
                    View Certificate
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 md:mt-0">
                <Button
                  label="Download Certificate"
                  variant="basic"
                  className="min-w-max"
                  textClass="md:text-base sm:text-sm text-xs"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px,1fr] pt-4 border-white">
            <div className=" w-full md:w-44 h-auto">
              <Image
                src={"/blog.png"}
                height={400}
                width={400}
                alt="Certificate"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col justify-between ml-4">
                <div>
                  <h1 className="font-medium text-xl mt-3 md:mt-0">
                    Digital Marketing Course
                  </h1>
                  <p className="font-normal text-base mt-1 mb-2">
                    Completed on June 30, 2024
                  </p>
                </div>
                <div className="flex items-center gap-3 cursor-pointer md:mb-3">
                  <span>
                    <FaRegEye />
                  </span>
                  <p className="text-primary text-base font-extrabold ">
                    View Certificate
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 md:mt-0">
                <Button
                  label="Download Certificate"
                  variant="basic"
                  className="min-w-max"
                  textClass="md:text-base sm:text-sm text-xs"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px,1fr] pt-4 border-white">
            <div className=" w-full md:w-44 h-auto">
              <Image
                src={"/blog.png"}
                width={400}
                height={400}
                alt="Certificate"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col justify-between ml-4">
                <div>
                  <h1 className="font-medium text-xl mt-3 md:mt-0">
                    Digital Marketing Course
                  </h1>
                  <p className="font-normal text-base mt-1 mb-2">
                    Completed on June 30, 2024
                  </p>
                </div>
                <div className="flex items-center gap-3 cursor-pointer md:mb-3">
                  <span>
                    <FaRegEye />
                  </span>
                  <p className="text-primary text-base font-extrabold ">
                    View Certificate
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 md:mt-0">
                <Button
                  label="Download Certificate"
                  variant="basic"
                  className="min-w-max"
                  textClass="md:text-base sm:text-sm text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </WithContentWrapper>
    </div>
  );
};

export default Certificate;
