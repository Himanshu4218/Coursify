import Image from "next/image";
import { FiUpload } from "react-icons/fi";

interface UploadType {
  id: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  videoPreview?: string;
  type?: string;
  isError?: boolean;
  isLoading?: boolean;
  pdfPreview?: string;
  disabled?: boolean;
}
const Upload = ({
  id,
  label,
  type = "Upload file here",
  onChange,
  preview,
  videoPreview,
  pdfPreview,
  isError,
  isLoading = false,
  disabled,
}: UploadType) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-md text-black font-medium mb-1">{label}</label>
      <label
        htmlFor={id}
        className="relative w-full h-24 flex items-center justify-center border-dashed border-2 rounded-lg border-gray-200"
      >
        <input
          id={id}
          type="file"
          accept="image/*,video/*,application/pdf"
          onChange={onChange}
          className="hidden cursor-pointer"
          disabled={disabled}
        />

        {isLoading && (
          <div className="absolute inset-0 bg-[#00000050] text-xl font-semibold flex justify-center items-center text-white z-50">
            Uploading...
          </div>
        )}

        {videoPreview && (
          <video
            src={videoPreview}
            className="w-full h-full rounded-md object-contain m-2"
            controls
          />
        )}

        {preview && (
          <Image
            src={preview}
            width={200}
            height={200}
            className="w-full h-full rounded-md object-contain m-2"
            alt="preview"
          />
        )}

        {pdfPreview && (
          <embed
            src={pdfPreview}
            type="application/pdf"
            className="w-full h-full rounded-md object-contain m-2"
          />
        )}

        {!(videoPreview || preview || pdfPreview) && (
          <>
            <div className="bg-greyshadowColor text-greySecondary w-14 h-14 flex-col rounded-full flex justify-center items-center mb-4">
              <FiUpload size={24} />
              <span className="block text-xs min-w-max">{type}</span>
            </div>
          </>
        )}
      </label>
      {isError && (
        <div className="text-red-500 font-medium error">
          Upload file is required
        </div>
      )}
    </div>
  );
};

export default Upload;
