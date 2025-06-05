import { useRef, useState } from "react";
import { MuxVideoPlayer } from "./MuxVideoPlayer";
import NextSVG from "public/assets/videos/next.svg";
import PrevSVG from "public/assets/videos/prev.svg";

interface VideoSliderProps {
  videos: string[];
  className?: string;
  autoplay?: boolean;
}

export function VideoSlider({ videos, className, autoplay = true }: VideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const styles = {
    button:
      "rounded-full bg-primary-500 hover:bg-primary-700 transition-colors h-14 w-14 p-4 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-default",
    svg: "h-6 w-6 text-white",
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentIndex(index);
      updateSlider(index);
    }
  };

  const goNext = () => goToSlide(currentIndex + 1);
  const goPrev = () => goToSlide(currentIndex - 1);

  const updateSlider = (index: number) => {
    if (!containerRef.current) return;

    const translateX = -((index * 100) / videos.length);
    containerRef.current.style.transform = `translateX(${translateX}%)`;

    const videoElements = containerRef.current.querySelectorAll("video");
    videoElements.forEach((video, videoIndex) => {
      if (videoIndex === index) {
        video.currentTime = 0;
        if (autoplay) video.play();
      } else {
        video.pause();
      }
    });
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === videos.length - 1;

  return (
    <div className="flex items-center justify-evenly gap-5 w-[600px]">
      <button className={styles.button} onClick={goPrev} disabled={isPrevDisabled}>
        <PrevSVG className={styles.svg} />
      </button>
      <div className="overflow-hidden flex-1 flex flex-col gap-5">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            width: `${videos.length * 100}%`,
          }}
        >
          {videos.map((video, index) => (
            <>
              <div className="flex-shrink-0" style={{ width: `${100 / videos.length}%` }}>
                <MuxVideoPlayer playbackId={video} />
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center gap-5 items-center">
          {Array.from({ length: videos.length }).map((_, index) => (
            <div key={index} className="flex justify-center gap-5 items-center">
              <div
                className={`rounded-xl shadow-xl  w-6 h-6 ${
                  index === currentIndex ? "bg-primary-500" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.button} onClick={goNext} disabled={isNextDisabled}>
        <NextSVG className={styles.svg} />
      </button>
    </div>
  );
}
