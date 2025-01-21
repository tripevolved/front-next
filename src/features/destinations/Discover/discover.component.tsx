import { Box } from "@/ui";
import type { DiscoverProps } from "./discover.types";
import { VerticalVideo } from "@/ui/components/multimedia/VerticalVideo";
import testVideo from '/videos/test_.mp4';
import testHorizontal from "/videos/test-horizontal_.mp4";
import { useRef, useState } from "react";

export function Discover({  }: DiscoverProps) {
  const containerComponent = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY);
  }

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    const height = containerComponent?.current?.clientHeight ?? 0;

    if (isDownSwipe) {
      containerComponent?.current?.scrollTo(0, -height);
    }
    if (isUpSwipe) {
      containerComponent?.current?.scrollTo(0, height);
    }
  }

  return (
    <div ref={containerComponent} className="discover" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="discover__item">
        <VerticalVideo src={testVideo} />
      </div>
      <div className="discover__item">
        <VerticalVideo src={testHorizontal} />
      </div>
    </div>
  );
}