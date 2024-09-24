"use client";

import { useFormik } from "formik";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/buttons/Button";
import { loginSchema } from "@/app/utils/schema/schema";
import axios from "@/app/utils/apis/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { loginUser } from "@/redux/features/user/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [persist, setPersist] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      try {
        const { data } = await axios.post("/api/users/login", values, config);
        localStorage.setItem("persist", JSON.stringify(persist));
        dispatch(loginUser({ ...data, persist }));
        router.push("/");
        toast.success("Successfully Logged In");
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
      <div className="lg:px-10 md:px-6 px-0 text-center space-y-4">
        <h1 className="text-4xl font-bold">Login into your account</h1>
        <p className="text-base text-gray-500 font-normal">
          Happy to see you again. You can continue where you left off by logging
          in
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <Input
          id="email"
          ref={inputRef}
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
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={persist}
              onChange={togglePersist}
            />
            <label
              htmlFor="remember"
              className="cursor-pointer text-greySecondary text-base font-normal"
            >
              Remember Me
            </label>
          </div>
          <Link href={"/auth/forgot-password"}>
            <span className="text-blue-600 hover:underline text-base font-medium cursor-pointer">
              Forgot Password
            </span>
          </Link>
        </div>
        <Button
          label="Login"
          className="w-full active:scale-95 transition-transform duration-200 "
        />
        <p className="text-center text-secondary cursor-pointer text-[14px] font-semibold">
          Want to Create New User Account ?{" "}
          <Link href={"/auth/register"}>
            <span className="text-blue-600 hover:underline">Sign Up</span>
          </Link>
        </p>
      </form>
      <p className="text-gray-500 text-xs text-center mt-5">
        © 2024 Pharmatop. All Rights Reserved.
      </p>
    </div>
  );
};

export default Login;
