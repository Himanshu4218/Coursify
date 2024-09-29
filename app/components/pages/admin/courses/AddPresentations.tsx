import React, { useCallback, useState } from "react";
// import { modalTypes } from "@/app/utils/constants/data";
import { useFormik } from "formik";
import { addPresentationSchema } from "@/app/utils/schema/schema";
import Modal from "@/app/components/modal/Modal";
import Upload from "@/app/components/input/Upload";
import { closeModal } from "@/redux/features/modal/modalSlice";
import Input from "@/app/components/input/Input";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

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
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

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
      isOpen={isOpen}
      label="Add Presentation"
      onSubmit={onSubmit}
      onClose={() => dispatch(closeModal())}
      buttonText="Add Presentation"
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <Input
          id="moduleName"
          label="Modules Name"
          name="moduleName"
          formik={formik}
          disabled={isLoading}
        />
        <Upload
          id="presetation"
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
