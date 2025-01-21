import Video from 'next-video';

import { Box } from "@/ui";
import { VerticalVideoProps } from "./vertical-video.types";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useRef } from 'react';

export function VerticalVideo({ src, className, children, sx, ...props }: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    videoRef?.current?.play();
  }

  const pauseVideo = () => {
    videoRef?.current?.pause();
  }

  const cn = makeCn("vertical-video", className)(sx);
  return (
    <Box className={cn}>
      <Box className="vertical-video__container">
        <Video
          ref={videoRef}
          className="vertical-video__video"
          src={src}
          autoPlay
          loop
          muted
          controls={false}
          onClick={() => videoRef?.current?.paused ? playVideo() : pauseVideo()}
        >
          {/* {(videoRef?.current?.paused && <img src={"playImage"}/>)} */}
          {children}
        </Video>
      </Box>
    </Box>
  );
}