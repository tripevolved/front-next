import Video from 'next-video';

import { Box } from "@/ui";
import { VerticalVideoProps } from "./vertical-video.types";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function VerticalVideo({ src, className, autoPlay, isMuted, children, sx, ...props }: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayImg, setShowPlayImg] = useState<Boolean>(false);
  const [muted, setMuted] = useState<boolean>(isMuted ?? false);

  const playPause = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }

  const muteUnmute = () => {
    if (muted) {
      setMuted(false);
      setMutedUnmuted(false);
    } else {
      setMuted(true);
      setMutedUnmuted(true);
    }
  }

  const setMutedUnmuted = (status: boolean) => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.defaultMuted = status;
    videoRef.current.muted = status;
  }

  setMutedUnmuted(muted);

  const cn = makeCn("vertical-video", className)(sx);
  return (
    <Box className={cn}>
      <Box className="vertical-video__container">
        <Video
          ref={videoRef}
          className="vertical-video__video"
          src={src}
          autoPlay={autoPlay ?? false}
          controls={false}
          onClick={playPause}
          onPlay={() => setShowPlayImg(false)}
          onPause={() => setShowPlayImg(true)}
        >
          {children}
        </Video>
        {showPlayImg && <PlayImage onClick={playPause} />}
        {muted ? <SoundImage onClick={muteUnmute} /> : <NoSoundImage onClick={muteUnmute} />}
      </Box>
    </Box>
  );
}

function PlayImage({ onClick }: { onClick: () => void }) {
  return (
    <Image className="vertical-video__container__play" alt="play" width={64} height={64} src={"/assets/videos/play.svg"} onClick={onClick} />
  );
}

function NoSoundImage({ onClick }: { onClick: () => void }) {
  return (
    <Image className="vertical-video__container__sound-control" alt="sound" width={32} height={32} src={"/assets/videos/mute.svg"} onClick={onClick} />
  );
}

function SoundImage({ onClick }: { onClick: () => void }) {
  return (
    <Image className="vertical-video__container__sound-control" alt="sound" width={32} height={32} src={"/assets/videos/unmute.svg"} onClick={onClick} />
  );
}