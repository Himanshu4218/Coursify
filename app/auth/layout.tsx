"use client";

import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { accessToken } = useAppSelector((state) => state.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);
  return (
    <div className="w-full h-screen flex">
      <div className="relative w-1/2 h-full flex items-center">
        <Image
          src={"/login.jpg"}
          alt={"Login"}
          width={500}
          height={500}
          className="w-full h-auto object-center object-cover"
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
