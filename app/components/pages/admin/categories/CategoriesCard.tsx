import Toggle from "@/app/components/buttons/Toggle";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

interface CategoryCardProps {
  label: string;
  description: string;
  onOpen: (value: boolean, edit?: boolean) => void;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  categoryId: number;
  setReload?: () => void;
  img: string;
}

const CategoriesCard: React.FC<CategoryCardProps> = ({
  onOpen,
  setCategoryId,
  categoryId,
  label = "",
  description = "",
  setReload,
  img,
}) => {
  const handleDeleteCategory = async () => {
    //   const url = ENDPOINTS.DELETE_CATEGORY;
    //   await postRequest(url, { category_id: categoryId }, true);
    if (setReload) {
      setReload();
    }
  };

  const options = (id: number) => [
    {
      label: "Edit Category",
      icon: <FiEdit3 />,
      onClick: () => {
        console.log(id);

        setCategoryId(id);
        onOpen(true, true);
      },
    },
    {
      label: "Remove Category",
      icon: <RxCross1 />,
      onClick: () => handleDeleteCategory(),
      isDangerous: true,
    },
  ];

  return (
    <div className="flex justify-between gap-x-2 shadow-custom-light m-2 p-3 rounded-md items-start bg-white">
      <div className="flex gap-x-3 items-center">
        <div className="min-w-16 max-w-16  rounded-md">
          <Image
            className="rounded-md object-contain w-full h-full"
            src={img}
            width={100}
            height={100}
            alt="img"
          />
        </div>
        <div className="list-none space-y-1 ">
          <li className="font-semibold text-base text-blackSecondary">
            {label}
          </li>
          <li className="text-greyPrimary break-words text-wrap text-xs font-normal">
            {description}
          </li>
        </div>
      </div>
      <div className="text-greyPrimary relative bg-greyDim w-8 h-8 grid place-items-center rounded-md cursor-pointer">
        <Toggle options={options(categoryId)} />
      </div>
    </div>
  );
};

export default CategoriesCard;
