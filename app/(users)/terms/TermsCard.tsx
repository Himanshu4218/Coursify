import Image from "next/image";
import React from "react";
import privacy from "@/public/privacy.webp";

interface PropType {
  title?: string;
  type?: string;
  description?: string;
}
const TermsCard = ({ title, type, description }: PropType) => {
  switch (type) {
    case "Terms":
      type = "Terms & Conditions";
      break;
    case "Privacy":
      type = "Privacy Policy";
      break;
  }

  return (
    <div>
      <div className="p-5 space-y-5">
        <div className="w-full h-[293px] text-center relative">
          <Image
            src={privacy}
            alt="privacy_policy_image"
            className="rounded-md object-cover w-full h-full"
          />
          <div className="absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%]  max-h-[147px]">
            <h1 className="font-extrabold text-[35px] sm:text-[42px]  mlg:text-[64px]">
              {type}
            </h1>
            <p className="font-normal text-[14px] lg:text-[16px] lg:px-36">
              {title}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="px-10 space-y-8">
          <div className="space-y-5 h-auto">
            <h1 className=" text-2xl  sm:text-[30px]  md:text-[36px] font-medium text-[#191D23]">
              Our commitment to protect your privacy
            </h1>
            <p className="font-normal text-greyPrimary text-base md:text-xl">
              {description}
            </p>
          </div>
          <div className="space-y-4 pb-10">
            <div className="space-y-2">
              <h1 className="text-xl font-medium text-[#191D23]">
                Information we Collect
              </h1>
              <p className="font-normal text-greyPrimary text-base">
                When you visit our website or use our services, we may collect
                certain information about you, including:{" "}
              </p>
              <div className="space-y-1 px-3 font-normal text-base">
                <li className="text-greyPrimary ">
                  Personal Information: such as your name, email address, phone
                  number, and billing information when you register for an
                  account or make a purchase.{" "}
                </li>
                <li className="text-greyPrimary ">
                  Usage Information: such as your IP address, browser type,
                  operating system, and device information when you interact
                  with our website or services.{" "}
                </li>
                <li className="text-greyPrimary ">
                  Cookies: We may use cookies and similar tracking technologies
                  to enhance your experience on our website and analyze how you
                  interact with our content.{" "}
                </li>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-xl font-medium text-[#191D23]">
                How We Use Your Information{" "}
              </h1>
              <p className="font-normal text-greyPrimary text-base">
                We may use the information we collect for the following
                purposes:
              </p>
              <div className="space-y-1 px-3 font-normal text-base">
                <li className="text-greyPrimary">
                  To provide and improve our services to you.
                </li>
                <li className="text-greyPrimary">
                  To personalize your experience and tailor our content to your
                  interests.
                </li>
                <li className="text-greyPrimary">
                  To communicate with you about your account, purchases, or
                  promotional offers.
                </li>
                <li className="text-greyPrimary">
                  To analyze usage trends and optimize the performance of our
                  website and services.{" "}
                </li>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-xl font-medium text-[#191D23]">
                Disclosure of Your Information{" "}
              </h1>
              <p className="font-normal text-greyPrimary text-base">
                We may share your information with third parties in the
                following circumstances:
              </p>
              <div className="space-y-1 px-3 font-normal text-base">
                <li className="text-greyPrimary">
                  With service providers who help us operate our website or
                  provide services to you.
                </li>
                <li className="text-greyPrimary">
                  With law enforcement or government authorities if required by
                  law or to protect our rights or the rights of others.
                </li>
                <li className="text-greyPrimary">
                  In connection with a corporate transaction, such as a merger,
                  acquisition, or sale of assets.
                </li>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-xl font-medium text-[#191D23]">
                Data Security{" "}
              </h1>
              <p className="font-normal text-greyPrimary text-base">
                We take reasonable measures to protect your information from
                unauthorized access, use, or disclosure. However, no method of
                transmission over the Internet or electronic storage is
                completely secure, so we cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCard;
