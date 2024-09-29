"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, isAdmin } = useAppSelector(
    (state) => state.user.userInfo
  );
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/login");
    }
    if (!isAdmin) {
      router.push("/");
    }
  }, [accessToken, router, isAdmin]);
  return <>{children}</>;
};

export default AdminLayout;
