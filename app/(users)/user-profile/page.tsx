"use client";

import { useState, ChangeEvent, useEffect, useCallback } from "react";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import { useFormik } from "formik";
import WithContentWrapper from "@/app/components/wrappers/WithContentWraper";
import {
  userDetailsSchema,
  userPasswordSchema,
} from "@/app/utils/schema/schema";
import Heading from "@/app/components/typography/Heading";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/input/Input";
import { useAppSelector } from "@/redux/hook";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";

interface UserType {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}
const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [showCurrPass, setShowCurrPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // File state
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [passLoading, setPassLoading] = useState<boolean>(false);
  const { auth } = useAppSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const initialUserValues = {
    firstName: userDetails?.username || "",
    lastName: "",
  };

  const userFormik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userDetailsSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userPasswordSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const toggleCurrPassword = () => setShowCurrPass((prev) => !prev);
  const toggleNewPassword = () => setShowNewPass((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPass((prev) => !prev);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      setProfilePic(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const getUserDetails = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/users/user-details");
      setUserDetails(data);
    } catch (error) {
      console.log("Error while fetching data:" + error);
    }
  }, [setUserDetails, axiosPrivate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <WithContentWrapper className="bg-orangeLight pb-10">
      <div className="pl-5 md:pl-20 xl:pl-32">
        <Heading label="My Account" level={2} />
        <div className="h-[5px] bg-orange-500 w-20 rounded-b-lg mt-2"></div>
      </div>
      <div className="bg-white mx-2 sm:mx-10 md:mx-12 xl:mx-32 p-6 md:p-10 rounded-md mt-8">
        <form onSubmit={userFormik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full w-[100px] h-[100px] overflow-hidden">
                <Image
                  src={"/men.png"}
                  alt="Profile Picture"
                  className="object-cover w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h1 className="text-xl font-medium">Profile Picture</h1>
                <p className="text-sm font-normal text-greyPrimary">
                  PNG, JPEG under 15 MB
                </p>
              </div>
            </div>

            <div className="flex justify-end items-start gap-4">
              <Button
                label="Upload New Picture"
                variant="greyTransparent"
                className="w-fit px-4"
                type="button"
                onClick={() =>
                  document.getElementById("profilePicInput")?.click()
                }
              />
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                label="Update Details"
                variant="simpleTransparent"
                type="submit"
                className="w-fit px-4 bg-mainBg"
                isLoading={updateLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
            <Input
              id="firstname"
              label="First Name"
              type="text"
              placeholder="First Name"
              value={userDetails?.username || ""}
              name="firstName"
              formik={userFormik}
            />
            <Input
              id="lastname"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              value={userFormik.values.lastName || ""}
              name="lastName"
              formik={userFormik}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="user@pharmatop@gmail.com"
              name="email"
              value={userDetails?.email || ""}
              disabled={true}
            />
          </div>
        </form>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-14">
            <h1 className="text-lg font-medium">Password</h1>
            <p className="text-sm font-normal text-greyPrimary">
              Modify your current password
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <div className="space-y-5">
                <Input
                  id="oldPassword"
                  label="Current Password"
                  type={!showCurrPass ? "password" : "text"}
                  placeholder=""
                  name="currentPassword"
                  formik={formik}
                  togglePassword={toggleCurrPassword}
                  showPassword={showCurrPass}
                />
                <Input
                  id="newPassword"
                  label="New Password"
                  type={!showNewPass ? "password" : "text"}
                  placeholder=""
                  name="newPassword"
                  formik={formik}
                  togglePassword={toggleNewPassword}
                  showPassword={showNewPass}
                />
                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type={!showConfirmPass ? "password" : "text"}
                  placeholder=""
                  name="confirmPassword"
                  formik={formik}
                  showPassword={showConfirmPass}
                  togglePassword={toggleConfirmPassword}
                />
              </div>
              <div className="flex items-end justify-end">
                <Button
                  label="Update Password"
                  variant="greyTransparent"
                  className="w-fit px-4"
                  isLoading={passLoading}
                />
              </div>
              <div>
                <div className="mt-14">
                  <h1 className="text-lg font-medium">Account Security</h1>
                  <p className="text-sm font-normal text-greyPrimary">
                    Manage your account security
                  </p>
                  <span className="text-redPrimary flex items-center gap-2 hover:underline cursor-pointer w-fit px-8 py-2 mt-4 rounded-md">
                    <TbLogout2 />
                    <span>Logout</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </WithContentWrapper>
  );
};

export default Profile;
