// import { modalTypes } from "@/app/utils/constants/data";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import Upload from "@/app/components/input/Upload";
import Modal from "@/app/components/modal/Modal";
import { addVideoLectureSchema } from "@/app/utils/schema/schema";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useFormik } from "formik";
import { useCallback, useState } from "react";

const AddLecture = ({
  courseId,
  setReload,
}: // onOpen,
{
  courseId: string;
  setReload: () => void;
  // onOpen: (value: boolean) => void;
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoImageFile, setVideoImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [videoPreview, setVideoPreview] = useState<string | undefined>(
    undefined
  );
  const [fileErr, setFileErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      module_name: "",
      description: "",
    },
    validationSchema: addVideoLectureSchema,
    onSubmit: async (values, { resetForm }) => {
      if (fileErr) return;
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", values.module_name);
        formData.append("description", values.description);
        formData.append("course_id", courseId);
        if (imageFile) {
          formData.append("thumbnail", imageFile);
        }
        if (videoImageFile) {
          formData.append("video", videoImageFile);
        }

        const url = ENDPOINTS.ADD_MODULE;
        const response = await postRequest(url, formData, true);
        if (response.result == 1) {
          setImageFile(null);
          setVideoImageFile(null);
          setPreview("");
          setVideoPreview("");
          resetForm();
          setReload();
          setTimeout(() => {
            setModalState(false, modalTypes.toggleLecture);
          }, 1000);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  //FORM SUBMIT FUNCTION WITH HANDLE CUSTOM IMAGE ERROR
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!imageFile || !preview || !videoPreview) {
        setFileErr(true);
      } else {
        setFileErr(false);
      }

      formik.handleSubmit();
    },
    [imageFile, preview, videoPreview, formik]
  );

  const uploadLogo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          setImageFile(file);
        } else {
          setVideoImageFile(file);
        }

        setFileErr(false);
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageDataUrl = event.target?.result as string | null;

          if (fileType === "image") {
            setPreview(imageDataUrl ?? undefined);
          } else if (fileType === "video") {
            setVideoPreview(imageDataUrl ?? undefined);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [imageFile]
  );

  return (
    <Modal
      isOpen={isOpen}
      label="Add Video Lecture"
      onSubmit={onSubmit}
      isLoading={isLoading}
      onClose={() => dispatch(closeModal())}
      buttonText="Add Lecture"
    >
      <div className="space-y-4 bg-white">
        <Input
          id="moduleName"
          label="Modules Name"
          name="moduleName"
          formik={formik}
          disabled={isLoading}
        />
        <Upload
          label="Thumbnail"
          onChange={uploadLogo}
          preview={preview}
          id="image_upload"
          isError={fileErr}
          disabled={isLoading}
        />
        <Upload
          label="Video"
          id="video-upload"
          onChange={uploadLogo}
          videoPreview={videoPreview}
          isError={fileErr}
          disabled={isLoading}
        />
        <TextArea
          id="description"
          name="description"
          label="Description"
          formik={formik}
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default AddLecture;
