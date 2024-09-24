"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaPlus, FaPlay } from "react-icons/fa6";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { SlOptionsVertical } from "react-icons/sl";
import useHookStore from "@/app/store/useHookStore";
import { modalTypes } from "@/app/utils/constants/data";
import Toggle from "@/app/components/buttons/Toggle";
import { LuEye } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { UrlHelper } from "@/app/utils/UrlHealper";
import { getRequest, postRequest } from "@/app/utils/apis/apiRequests";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import Player from "../../courses/Player";

const Button = dynamic(() => import("@/app/components/buttons/Button"));
const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface CourseDataProps {
  course_name: string;
  category_name: string;
  description: string;
  price: string | number;
  course_image: string;
  duration: string | number;
  skills: string[];
  language: string;
  videos?: videoProps[];
  documents: documentProps[];
  presentations: presentationProps[];
}

interface videoProps {
  video: string;
  id: number;
  title: string;
  description: string;
}
interface documentProps {
  document: string;
  document_name: string;
  id: number;
}
interface presentationProps {
  document: string;
  document_name: string;
  id: number;
}

interface CourseContentCardProps {
  courseData: CourseDataProps;
  setReload?: () => void;
}

const CourseContentCard: React.FC<CourseContentCardProps> = ({
  courseData,
  setReload,
}) => {
  console.log("courseData", courseData);
  const { modalState, setModalState } = useHookStore();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onLectureOpen = () => {
    setModalState(true, modalTypes.toggleLecture);
  };

  const onDocumentOpen = () => {
    setModalState(true, modalTypes.toggleDocument);
  };

  const onPresentationOpen = () => {
    setModalState(true, modalTypes.togglePresentation);
  };

  const handleDeleteModuleVideo = async (id: number) => {
    const url = ENDPOINTS.DELETE_MODULE_VIDEO;
    await postRequest(url, { video_id: id }, true);
    if (setReload) {
      setReload();
    }
  };
  const handleDeleteModuleDocument = async (id: number) => {
    const url = ENDPOINTS.DELETE_MODULE_DOCUMENT;
    await postRequest(url, { document_id: id }, true);
    if (setReload) {
      setReload();
    }
  };

  const optionsVideo = (id: number) => [
    {
      label: "Remove Video",
      icon: <RxCross1 />,
      onClick: () => handleDeleteModuleVideo(id),
      isDangerous: true,
    },
  ];
  const optionsDocument = (id: number) => [
    {
      label: "Remove Document",
      icon: <RxCross1 />,
      onClick: () => handleDeleteModuleDocument(id),
      isDangerous: true,
    },
  ];
  const optionsPresentation = (id: number) => [
    {
      label: "Remove Presentation",
      icon: <RxCross1 />,
      onClick: () => handleDeleteModuleDocument(id),
      isDangerous: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-x-5">
      <div className="space-y-5 pt-3 md:pt-0">
        <h1 className="font-bold text-[18px]">Videos Lectures</h1>
        <div className="bg-white rounded-2xl pb-0 p-3 space-y-4 max-h-[500px] overflow-y-scroll">
          {courseData?.videos && courseData?.videos?.length > 0 ? (
            courseData?.videos?.map((videos: videoProps, index: number) => (
              <div
                className="items-center shadow-md rounded-md p-5"
                key={index}
              >
                <div className="relative w-full h-full rounded-md flex items-center justify-center">
                  <Player
                    url={videos.video}
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    width="100%"
                    height="100%"
                  />
                  {!isPlaying && (
                    <FaPlay
                      size={25}
                      onClick={() => setIsPlaying(true)}
                      className="text-white cursor-pointer absolute z-10"
                    />
                  )}
                  <div className="absolute top-5 right-5 text-white z-10">
                    <div className="text-white">
                      <Toggle
                        className="text-white"
                        options={optionsVideo(videos.id)}
                      />
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-[13px]">
                  {videos.description}
                </span>
              </div>
            ))
          ) : (
            <span className="font-normal text-greyPrimary flex items-center justify-center">
              No Record Found
            </span>
          )}

          <div className="bg-white py-3 rounded-md z-20 sticky bottom-0">
            <Button
              label="Add Video Lectures"
              variant="basicTransparent"
              className=""
              onClick={onLectureOpen}
              icon={<FaPlus />}
            />
          </div>
        </div>
      </div>
      <div className="space-y-5 pt-3 md:pt-0">
        <h1 className="font-bold text-[18px]">Documents</h1>
        <div className="bg-white rounded-2xl mr-2 pb-0 p-3 space-y-4 max-h-[500px] overflow-y-scroll">
          {courseData?.documents && courseData?.documents?.length > 0 ? (
            courseData?.documents?.map(
              (document: documentProps, index: number) => (
                <div
                  className="flex items-center justify-between shadow-md rounded-md"
                  key={index}
                >
                  <a
                    href={document.document}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="p-2 m-2 bg-gray-50 rounded-md">
                        <AiOutlineFilePdf className="text-red-700" size={35} />
                      </div>
                      <span className="font-semibold text-[13px]">
                        {document.document_name}
                      </span>
                    </div>
                  </a>
                  <div className="my-3 mx-4 text-gray-700">
                    <Toggle options={optionsDocument(document.id)} />
                  </div>
                </div>
              )
            )
          ) : (
            <span className="font-normal text-greyPrimary flex items-center justify-center">
              No Record Found
            </span>
          )}
          <div className="bg-white py-3 rounded-md z-20 sticky bottom-0">
            <Button
              label="Add Documents"
              variant="basicTransparent"
              onClick={onDocumentOpen}
              icon={<FaPlus />}
            />
          </div>
        </div>
      </div>
      <div className="space-y-5 pt-3 md:pt-0">
        <h1 className="font-bold text-[18px]">Presentations</h1>
        <div className="bg-white rounded-2xl mr-2 pb-0 p-3 space-y-4 max-h-[500px] overflow-y-scroll">
          {courseData?.presentations &&
          courseData?.presentations?.length > 0 ? (
            courseData?.presentations?.map(
              (presentation: presentationProps, index: number) => (
                <div
                  className="flex items-center justify-between shadow-md rounded-md"
                  key={index}
                >
                  <a href={presentation.document} target="_blank" key={index}>
                    <div className="flex items-center cursor-pointer">
                      <div className="p-2 m-2 bg-gray-50 rounded-md">
                        <PiMicrosoftPowerpointLogoFill
                          className="text-red-700"
                          size={35}
                        />
                      </div>
                      <span className="font-semibold text-[13px]">
                        {presentation.document_name}
                      </span>
                    </div>
                  </a>
                  <div className="my-3 mx-4 text-gray-700">
                    <Toggle options={optionsPresentation(presentation.id)} />
                  </div>
                </div>
              )
            )
          ) : (
            <span className="font-normal text-greyPrimary flex items-center justify-center">
              No Record Found
            </span>
          )}

          <div className="bg-white py-3 rounded-md z-20 sticky bottom-0">
            <Button
              label="Add Presentations"
              variant="basicTransparent"
              icon={<FaPlus />}
              onClick={onPresentationOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentCard;
