"use client";

import { useFormik } from "formik";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/buttons/Button";
import { resetPasswordSchema } from "@/app/utils/schema/schema";
import axios from "@/app/utils/apis/axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Link from "next/link";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { resetToken } = useParams();
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.put(
          `/api/users/reset-password/${resetToken}`,
          { newPassword: values.newPassword },
          config
        );
        console.log(data);
        router.push("/auth/login");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="w-1/2 flex justify-center flex-col gap-8 p-5 lg:px-24 md:px-18 px-14">
      <div className="lg:px-10 md:px-6 px-0 text-center space-y-4">
        <h1 className="lg:text-4xl md:text-3xl text-2xl text-primaryBlack font-bold">
          Reset Password
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <Input
          id="newPassword"
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          label="New Password"
          name="newPassword"
          placeholder="Enter new password here"
          togglePassword={togglePassword}
          showPassword={showPassword}
          formik={formik}
        />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password here"
          togglePassword={togglePassword}
          showPassword={showPassword}
          formik={formik}
        />
        <Button label="Confirm" type="submit" />
        <p className="text-center text-primary cursor-pointer text-[14px] font-semibold">
          <span className="mt-3 text-center text-primary cursor-pointer">
            Want to Login?{" "}
          </span>
          <Link href={"/auth/login"}>
            <span className="text-blue-600 hover:underline">Login</span>
          </Link>
        </p>
      </form>
      <p className="text-gray-500 text-xs text-center mt-5">
        © 2024 Pharmatop. All Rights Reserved.
      </p>
    </div>
  );
};

export default ResetPassword;
