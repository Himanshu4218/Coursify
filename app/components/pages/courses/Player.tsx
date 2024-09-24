"use client";

import dynamic from "next/dynamic";
// import video from "@/public/assets/videos12345.mp4";
const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface PropType {
  url: string;
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  width: string;
  height: string;
}

const Player = ({ url, playing, onPlay, onPause, width, height }: PropType) => {
  return (
    <DynamicReactPlayer
      url={url}
      controls={true}
      playing={playing}
      onPlay={onPlay}
      onPause={onPause}
      width={width}
      height={height}
      className="react-player"
      style={{
        overflow: "hidden",
        borderRadius: "6px",
        zIndex: 10,
      }}
    />
  );
};

export default Player;
