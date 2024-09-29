"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAppSelector((state) => state.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/login");
    }
  }, [accessToken, router]);

  // if (!accessToken) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center text-2xl text-secondary font-medium">
  //       Redirecting...
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
