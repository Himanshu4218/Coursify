import Modal from "@/app/components/modals/Modal";
import useHookStore from "@/app/store/useHookStore";
import { postRequest } from "@/app/utils/apis/apiRequests";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import { modalTypes } from "@/app/utils/constants/data";
import { addDocumentsSchema } from "@/app/utils/schema/schema";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
const Input = dynamic(() => import("@/app/components/inputs/Input"));
const UploadInput = dynamic(() => import("@/app/components/inputs/Upload"));

const AddDocuments = ({
  courseId,
  setReload,
}: // onOpen,
{
  courseId: string;
  setReload: () => void;
  // onOpen: (value: boolean) => void;
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
    validationSchema: addDocumentsSchema,
    onSubmit: async (values, { resetForm }) => {
      if (fileErr) return;
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("document_name", values.module_name);
        formData.append("course_id", courseId);
        formData.append("document_type", "pdf");

        if (imageFile) {
          formData.append("document", imageFile);
        }

        const url = ENDPOINTS.ADD_DOCUMENT;
        const response = await postRequest(url, formData, true);
        if (response.result == 1) {
          setImageFile(null);
          setPreview("");
          resetForm();
          setReload();
          setTimeout(() => {
            setModalState(false, modalTypes.toggleDocument);
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

  //FORM SUBMIT FUNCTION WITH HANDLE CUSTOM IMAGE ERROR
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
      isOpen={modalState.toggleDocument}
      label="Add Documents"
      onSubmit={onSubmit}
      closeModalFunc={() => setModalState(false, modalTypes.toggleDocument)}
      buttonTxt="Add Document"
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
          label="Document"
          type="Upload Document"
          onChange={uploadLogo}
          pdfPreview={preview}
          isError={fileErr}
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default AddDocuments;
