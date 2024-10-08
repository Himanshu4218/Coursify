"use client";

import Image from "next/image";
import { GoPencil } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { useFormik } from "formik";
import { updateProfileSchema } from "@/app/utils/schema/schema";
import { useCallback, useState } from "react";
import Input from "@/app/components/input/Input";
import Heading from "@/app/components/typography/Heading";
import Button from "@/app/components/buttons/Button";

const Profile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        const user =
          typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("user") || "");
        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("phone", values.phone);
        formData.append("current_password", values.current_password);
        formData.append("new_password", values.new_password);
        formData.append("confirm_password", values.confirm_password);
        if (imageFile) {
          formData.append("profile_image", imageFile);
        }
        const response = await postRequest(
          ENDPOINTS.UPDATE_PROFILE,
          formData,
          true
        );
      } catch (error) {}
    },
  });

  //FOR UPLOAD IMAGE
  const uploadLogo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target?.result as string | null;
          setPreview(imageDataUrl ?? undefined);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(undefined);
      }
    },
    [imageFile]
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-5 rounded-md md:px-10 px-5"
    >
      <label
        htmlFor="profile_img"
        className="w-52 h-52 rounded-full relative block"
      >
        <Image
          src={"/men.png"}
          width={300}
          height={200}
          alt="image"
          className="h-full w-full object-contain rounded-full"
        />
        <div className="bg-primary w-7 h-7 grid place-items-center rounded-full absolute right-8 bottom-1 cursor-pointer">
          <GoPencil color="white" />
        </div>
        <input
          type="file"
          id="profile_img"
          className="hidden cursor-pointer"
          accept="image/*"
          onChange={uploadLogo}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          id="firstName"
          label="First Name"
          name="firstName"
          formik={formik}
        />
        <Input
          id="lastName"
          label="Last Name"
          name="lastName"
          formik={formik}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          name="email"
          formik={formik}
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          name="phone"
          type="number"
          formik={formik}
        />
      </div>

      <div className="space-y-4">
        <Heading label="Password and Authentication" />
        <Input
          id="currentPassword"
          label="Current Password"
          name="currentPassword"
          type="password"
          formik={formik}
        />
        <Input
          id="newPassword"
          label="New Password"
          name="newPassword"
          type="password"
          formik={formik}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          name="confirm_password"
          type="password"
          formik={formik}
        />
      </div>

      <div className="flex items-center w-fit gap-2">
        <Button label="Update Password" />
        <span className="text-redPrimary flex items-center gap-2 hover:underline cursor-pointer">
          <TbLogout2 />
          <span>Logout</span>
        </span>
      </div>
    </form>
  );
};

export default Profile;
