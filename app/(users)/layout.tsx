"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.accessToken) {
      router.push("/auth/login");
    }
  }, [auth, router]);

  if (!auth?.accessToken) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-2xl text-secondary font-medium">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
