import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import UploadInput from "@/app/components/input/Upload";
import Modal from "@/app/components/modal/Modal";
import { axiosPrivate } from "@/app/utils/apis/axios";
import { addCategorySchema } from "@/app/utils/schema/schema";
import axios from "axios";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";

interface AddCategoryProps {
  isModalOpen: boolean;
  category_name?: string;
  description?: string;
  category_image?: string;
  setReload: Dispatch<SetStateAction<boolean>>;
  onOpen: (value: boolean) => void;
  categoryId?: number;
}

const AddCategory = ({ onOpen, isModalOpen, setReload }: AddCategoryProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>();

  const handleSubmit = () => {};

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          formik.setFieldValue("categoryImage", res.data.secure_url);
        }
      } catch (error) {
        console.error("Image upload failed", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryImage: "",
      categoryDescription: "",
    },
    validationSchema: addCategorySchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axiosPrivate.post(
          "/api/courses/addCategory",
          values
        );
        setReload((prev) => !prev);
        onOpen(false);
        setPreview("");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Modal
        label={"Add New Category"}
        isOpen={isModalOpen}
        onSubmit={formik.handleSubmit}
        onClose={() => {
          setPreview(null);
          onOpen(false);
        }}
        buttonText={"Add New Category"}
      >
        <div className="space-y-4 mb-4">
          <UploadInput
            id="file"
            label="Category Image"
            onChange={onUpload}
            isError={isError}
            isLoading={isLoading}
            preview={preview as string}
            disabled={isLoading}
          />
          <Input
            id="category_name"
            type="text"
            label="Category Name"
            name="categoryName"
            placeholder="Enter Category Name"
            formik={formik}
          />
          <TextArea
            id="category_description"
            label="Category Description"
            name="categoryDescription"
            formik={formik}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddCategory;
