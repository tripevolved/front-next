import Video from 'next-video';

import { Box } from "@/ui";
import { VerticalVideoProps } from "./vertical-video.types";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function VerticalVideo({ src, className, autoPlay, children, sx, ...props }: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayImg, setShowPlayImg] = useState<Boolean>(false);

  const playPause = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }

  const cn = makeCn("vertical-video", className)(sx);
  return (
    <Box className={cn}>
      <Box className="vertical-video__container">
        <Video
          ref={videoRef}
          className="vertical-video__video"
          src={src}
          autoPlay={autoPlay ?? false}
          muted
          controls={false}
          blurDataURL="/assets/videos/play.svg"
          onClick={playPause}
          onPlay={() => setShowPlayImg(false)}
          onPause={() => setShowPlayImg(true)}
        >
          {children}
        </Video>
        {showPlayImg && <PlayImage onClick={playPause} />}
      </Box>
    </Box>
  );
}

function PlayImage({ onClick }: { onClick: () => void }) {
  return (
    <Image className="vertical-video__container__play" alt="play" width={64} height={64} src={"/assets/videos/play.svg"} onClick={onClick} />
  );
}