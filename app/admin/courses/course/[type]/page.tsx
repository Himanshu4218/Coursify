"use client";

import { addCourseSchema } from "@/app/utils/schema/schema";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Heading from "@/app/components/typography/Heading";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import Upload from "@/app/components/input/Upload";
import SelectBox from "@/app/components/input/SelectBox";
import { getAllCategories } from "@/redux/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import axios, { axiosPrivate } from "@/app/utils/apis/axios";

interface CourseContentDataProps {
  category_id: string;
  course_name: string;
  category_name: string;
  description: string;
  price: string | number;
  course_image: string;
  duration: string | number;
  skills: string[];
  language: string;
  videos: any;
  documents: any;
  presentations: any;
}

interface CategoriesTypes {
  id: number;
  categoryName: string;
  description: string;
  category_image: string;
  img: string;
}

const AddCource = ({ params }: { params: { type: string } }) => {
  const temp = useSearchParams();
  const editId = temp.get("id");
  const router = useRouter();

  const [skills, setSkills] = useState<string[]>([]);
  const [fileErr, setFileErr] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | undefined>(
    undefined
  );
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<CourseContentDataProps | null>(
    null
  );
  const { categories } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (editId) {
  //     getCourseById();
  //   }
  // }, [getCourseById]);

  // useEffect(() => {
  //   if (courseData) {
  //     formik.setValues({
  //       category: courseData?.category_id,
  //       content_lang: courseData?.language,
  //       course_name: courseData?.course_name,
  //       course_price: String(courseData?.price),
  //       course_description: courseData?.description,
  //     });
  //     setSkills(courseData.skills);
  //     if (courseData.course_image) {
  //       setPreview(courseData.course_image);
  //     }
  //   }
  // }, [courseData]);

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      const newSkill = e.currentTarget.value.trim();
      const updatedSkills = [...skills, newSkill];

      setSkills(updatedSkills);
      formik.setFieldValue("skills", updatedSkills);
      e.currentTarget.value = "";
    }
  };

  // DELETE SKILL FUNCTIONALITY
  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    formik.setFieldValue("skills", updatedSkills);
  };

  //HANDLE FORM AND ADD CATEGORY API
  const formik = useFormik({
    initialValues: {
      category: "",
      contentLang: "",
      courseName: "",
      coursePrice: "",
      courseDescription: "",
      courseImage: "",
    },
    validationSchema: addCourseSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const { data } = await axiosPrivate.post(
          "/api/courses/addCourse",
          values
        );
        console.log(data);
        setPreview("");
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  //FORM SUBMIT FUNCTION WITH HANDLE CUSTOM IMAGE ERROR
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!imageFile || !preview) {
        setFileErr(true);
      } else {
        setFileErr(false);
      }
      formik.handleSubmit();
    },
    [imageFile, preview, formik]
  );

  //FOR UPLOAD IMAGE
  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setImageFile(file);
        setIsError(false);

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target?.result;
          setPreview(imageDataUrl || "");
        };
        reader.readAsDataURL(file);
      }

      if (
        file?.type === "image/jpg" ||
        file?.type === "image/jpeg" ||
        file?.type === "image/png"
      ) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "coursify");
        data.append("could_name", "dhfjmandp");

        try {
          setIsLoading(true);
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dhfjmandp/image/upload",
            data
          );
          if (res.data.secure_url) {
            formik.setFieldValue("courseImage", res.data.secure_url);
          }
        } catch (error) {
          console.error("Image upload failed", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [imageFile]
  );

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  const options =
    useMemo(
      () =>
        categories?.map((category) => ({
          value: category?.name,
          label: category?.name,
        })),
      [categories]
    ) || [];

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between p-6">
          <Heading
            label={params.type == "edit" ? "Update Course" : "Add Course"}
            className="text-3xl font-semibold"
          />
          <Button
            variant="basic"
            label={params.type == "edit" ? "Update Course" : "Save Course"}
            className="w-fit"
            onClick={onSubmit}
            isLoading={isLoading}
          />
        </div>
        <div className="p-6 bg-white grid grid-cols-2 gap-4 rounded-md">
          <SelectBox
            label="Select Category"
            disabled={isLoading}
            name="category"
            formik={formik}
            options={options}
            isLoading={categoryLoading}
          />

          <Input
            id="contentLanguage"
            label="Content Language"
            disabled={isLoading}
            name="contentLang"
            formik={formik}
          />

          <Input
            id="contentLanguage"
            label="Course Name"
            name="courseName"
            disabled={isLoading}
            formik={formik}
          />

          <Input
            id="contentLanguage"
            name="coursePrice"
            label="Course Price ($)"
            disabled={isLoading}
            formik={formik}
          />

          <Upload
            id="courseImage"
            label="Course Image"
            onChange={onUpload}
            preview={preview as string}
            isError={fileErr}
            disabled={isLoading}
          />

          <div className="space-y-2">
            <Input
              id="skill"
              type="text"
              label="Skill"
              name="skills"
              disabled={isLoading}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter"
            />
            <ul className="flex gap-2 justify-start flex-wrap max-h-[100px] overflow-y-auto">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-greyDim p-1 px-2 rounded-md w-fit flex items-center"
                >
                  <span>{skill}</span>
                  <span title="Delete">
                    <MdOutlineDeleteOutline
                      className="text-redPrimary inline ml-2 cursor-pointer"
                      onClick={() => handleDeleteSkill(index)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <TextArea
            id="courseDescription"
            name="courseDescription"
            disabled={isLoading}
            formik={formik}
            label="Course Description"
          />
        </div>
      </div>
    </>
  );
};

export default AddCource;
