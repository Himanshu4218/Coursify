"use client";

import Input from "@/app/components/inputs/Input";
import { postRequest } from "@/app/utils/apis/apiRequests";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import { addStaticContentSchema } from "@/app/utils/schema/schema";
import { LuMoveLeft } from "react-icons/lu";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";

const Button = dynamic(() => import("@/app/components/buttons/Button"), {
  ssr: false,
});

const Editor = dynamic(() => import("@/app/components/editor/Editor"), {
  ssr: false,
});

const SelectBox = dynamic(() => import("@/app/components/inputs/SelectBox"), {
  ssr: false,
});

const Preview = dynamic(() => import("@/app/(users)/terms/TermsCard"), {
  ssr: false,
});

import { IoEye } from "react-icons/io5";

const options = [
  { value: "Terms", label: "Terms" },
  { value: "Privacy", label: "Privacy" },
  { value: "About", label: "About" },
];

const AddTerms = () => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
    },
    validationSchema: addStaticContentSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        let payload = {
          content_type: values.type,
          title: values.title,
          description: values.description,
        };
        const url = ENDPOINTS.UPDATE_STATIC_CONTENT;
        const response = await postRequest(url, payload);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <>
        <button
          onClick={() => setShowPreview(false)}
          className="flex gap-1 items-center  rounded-lg py-1 px-1 justify-start"
        >
          <span>
            <LuMoveLeft />
          </span>
          <span className="hover:underline">Back</span>
        </button>
        <Preview
          title={formik.values.title}
          type={formik.values.type}
          description={editorValue}
        />
      </>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-5 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectBox label="Type" name="type" options={options} formik={formik} />

        <Input label="Heading" name="title" formik={formik} />
      </div>

      <Editor editorValue={editorValue} setEditorValue={setEditorValue} />

      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button
            label="Preview"
            icon={<IoEye />}
            type="button"
            variant="simpleTransparent"
            onClick={handlePreview}
          />
          <Button label="Upload" disabled={isLoading} isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
};

export default AddTerms;
