import { useRef, useState } from "react";
import { MuxVideoPlayer } from "./MuxVideoPlayer";

interface VideoSliderProps {
  videos: string[];
  className?: string;
  autoplay?: boolean;
}

export function VideoSlider({ videos, className, autoplay = true }: VideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <button
        className="rounded-full bg-primary-500 hover:bg-primary-700 transition-colors h-14 w-14 p-4 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-default"
        onClick={goPrev}
        disabled={isPrevDisabled}
      >
        <svg
          className="h-28 w-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
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
      <button
        className="rounded-full bg-primary-500 hover:bg-primary-700 transition-colors h-14 w-14 p-4 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-default"
        onClick={goNext}
        disabled={isNextDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
}
