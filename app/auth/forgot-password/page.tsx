'use client'

import { useFormik } from "formik";
import Input from "../../components/input/Input";
import Button from "@/app/components/buttons/Button";
import { forgotPasswordSchema } from "@/app/utils/schema/schema";
import axios from "../../utils/apis/axios";
import { useEffect, useRef } from "react";
import Link from "next/link";

const ForgotPassword = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }

            try {
                const { data } = await axios.post('/api/users/forgot-password', values, config)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        },
    });

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])
    return (
        <div className="w-1/2 flex justify-center flex-col gap-8 p-5 lg:px-24 md:px-18 px-14">
            <div className="lg:px-10 md:px-6 px-0 text-center space-y-4">
                <h1 className="lg:text-[45px] md:text-3xl text-2xl text-blackPrimary font-bold">
                    Forgot Password
                </h1>
                <p className="text-base text-greyPrimary font-normal">
                    Enter a new password to secure your account
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
                <Button label="Reset Password" className="w-full" />
                <p
                    className="text-center text-primary cursor-pointer text-[14px] font-semibold"
                >
                    Want to Create New User Account ? {" "}
                    <Link href={'/auth/login'}>
                        <span className="text-blue-600 hover:underline">Back To Login</span>
                    </Link>
                </p>
            </form>
            <p className="text-gray-500 text-xs text-center mt-5">
                © 2024 Pharmatop. All Rights Reserved.
            </p>
        </div>
    );
};

export default ForgotPassword;
