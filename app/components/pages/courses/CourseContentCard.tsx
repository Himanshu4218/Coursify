import Image, { StaticImageData } from "next/image";
import { RiPlayFill } from "react-icons/ri";

interface CourseContentCardProps {
  img: StaticImageData;
  title: string;
  duration: string;
}

const CourseContentCard: React.FC<CourseContentCardProps> = ({
  img,
  title,
  duration,
}) => {
  return (
    <div className="flex md:flex-row flex-col justify-start bg-primaryLight p-3 rounded-md gap-3">
      <div className="h-48 md:h-16 min-w-16 relative">
        <Image
          src={img}
          alt="image"
          className="h-full w-full object-cover rounded-md"
        />

        <RiPlayFill className="text-xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <h2 className="text-xl font-medium">{title}</h2>
        <h1 className="font-medium text-primary text-sm">{duration}</h1>
      </div>
    </div>
  );
};

export default CourseContentCard;
