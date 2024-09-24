import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@/app/components/modals/Modal";
import useHookStore from "@/app/store/useHookStore";
import { modalTypes } from "@/app/utils/constants/data";
import { useFormik } from "formik";
import { addPresentationSchema } from "@/app/utils/schema/schema";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import { postRequest } from "@/app/utils/apis/apiRequests";

const Input = dynamic(() => import("@/app/components/inputs/Input"));
const UploadInput = dynamic(() => import("@/app/components/inputs/Upload"));

const AddPresentations = ({
  courseId,
  setReload,
}: {
  courseId: string;
  setReload: () => void;
}) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { modalState, setModalState } = useHookStore();

  const formik = useFormik({
    initialValues: {
      module_name: "",
    },
    validationSchema: addPresentationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (fileErr) return;
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("document_name", values.module_name);
        formData.append("course_id", courseId);
        formData.append("document_type", "ppt");

        if (imageFile) {
          formData.append("document", imageFile);
        }

        const url = ENDPOINTS.ADD_DOCUMENT;
        const response = await postRequest(url, formData, true);
        console.log("response", response);
        if (response.result == 1) {
          setTimeout(() => {
            setReload();
            setModalState(false, modalTypes.togglePresentation);
            setImageFile(null);
            setPreview("");
            resetForm();
          }, 1000);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  const uploadLogo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setImageFile(file ?? null);
      if (file) {
        setFileErr(false);
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageDataUrl = event.target?.result as string | null;
          setPreview(imageDataUrl ?? undefined);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <Modal
      isOpen={modalState.togglePresentation}
      label="Add Presentation"
      onSubmit={onSubmit}
      closeModalFunc={() => setModalState(false, modalTypes.togglePresentation)}
      buttonTxt="Add Presentation"
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <Input
          label="Modules Name"
          name="module_name"
          formik={formik}
          disabled={isLoading}
        />
        <UploadInput
          label="Presentation"
          type="Upload Presentation"
          onChange={uploadLogo}
          pdfPreview={preview}
          isError={fileErr}
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default AddPresentations;
