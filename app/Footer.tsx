import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#1E40AE] py-5 mt-20">
      <div className="w-[90%] mx-auto text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 justify-self-stretch py-4 mb-4 gap-8">
          <div className="text-white flex flex-col col-span-2 gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">Coursify</h1>
            <h2 className="text-xl md:text-2xl font-bold">Your Online</h2>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Learning Platform
            </h2>
            <div className="flex gap-6">
              {[
                "/facebook.png",
                "/linkedin.png",
                "/instagram.png",
                "/youtube.png",
                "/twitter.png",
              ].map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt="social media icon"
                  width={25}
                  height={25}
                  className="w-5 h-auto"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-lg md:text-xl font-semibold">Links</h3>
            <ul className="flex flex-col gap-4 text-sm md:text-base">
              <li>About</li>
              <li>Categories</li>
              <li>Free Courses</li>
              <li>Why Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-lg md:text-xl font-semibold">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm md:text-base">
              <li className="flex items-center gap-3 text-white">
                <Image
                  src="/phone.png"
                  alt="phone"
                  width={20}
                  height={20}
                  className="w-4 h-auto"
                />
                <span>+91-9953-67-9362</span>
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/email.png"
                  alt="email"
                  width={20}
                  height={20}
                  className="w-4 h-auto"
                />
                <span>kashyaphimanshu398@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/location.png"
                  alt="location"
                  width={20}
                  height={20}
                  className="w-4 h-auto"
                />
                <span>Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border border-[#F9FAFB]"></div>
        <div className="flex flex-col gap-3 md:flex-row justify-between my-5 text-sm md:text-base">
          <span>© 2023 Coursify. All rights reserved.</span>
          <span className="cursor-pointer">
            <Link href={"/terms/privacy-policy"}>Privacy policy</Link> |{" "}
            <Link href={"/terms/terms-conditions"}>Terms & Conditions</Link>
          </span>
          <span>kashyaphimanshu398@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
