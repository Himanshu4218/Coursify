"use client";

import { useFormik } from "formik";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/buttons/Button";
import { registerSchema } from "@/app/utils/schema/schema";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/app/utils/apis/axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/users/register", values);
        router.push("/auth/login");
        toast.success("Successfully registered");
      } catch (error) {
        console.log(error);
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
      <div className="lg:px-10 md:px-6 px-0 text-center space-y-3 mt-4">
        <h1 className="lg:text-4xl md:text-3xl text-2xl text-primaryBlack font-bold">
          Sign Up for an account
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <Input
          id="username"
          ref={inputRef}
          type="text"
          label="Username"
          name="username"
          placeholder="Enter username here"
          formik={formik}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          name="email"
          placeholder="Enter email here"
          formik={formik}
        />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          placeholder="Enter password here"
          togglePassword={togglePassword}
          showPassword={showPassword}
          formik={formik}
        />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          togglePassword={togglePassword}
          showPassword={showPassword}
          formik={formik}
        />
        <Button type="submit" label="Sign Up" className="w-full" />
        <p className="text-center text-secondary cursor-pointer text-[14px] font-semibold">
          Want to Create New User Account ?{" "}
          <Link href={"/auth/login"}>
            <span className="text-blue-600 hover:underline">Sign In</span>
          </Link>
        </p>
      </form>
      <p className="text-gray-500 text-xs text-center mt-5">
        © 2024 Coursify. All Rights Reserved.
      </p>
    </div>
  );
};

export default Register;
