import type { DiscoverProps } from "./discover.types";
import { VerticalVideo } from "@/ui/components/multimedia/VerticalVideo";
import testVideo from '/videos/test.mp4';
import testHorizontal from "/videos/test_horizontal.mp4";
import testMov from "/videos/test2.mov";

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import { useRef, useState } from "react";

export function Discover({  }: DiscoverProps) {
  const swiper = useRef<SwiperRef>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

  const changeFocus = () => {
    videoRef?.pause();

    const videoElements = document.getElementById(`discover__item__${swiper?.current?.swiper.activeIndex}`)?.getElementsByTagName("mux-video");
    const videoElement = videoElements && videoElements.length > 0 ? videoElements[0] as HTMLVideoElement : undefined;
    
    videoElement?.play();
    setVideoRef(videoElement);
  };

  return (
    <Swiper
      ref={swiper}
      direction={"vertical"}
      className="discover"
      mousewheel={true}
      keyboard={{
        enabled: true
      }}
      modules={[ Mousewheel, Keyboard ]}
      onActiveIndexChange={changeFocus}
    >
      <SwiperSlide id={`discover__item__${0}`} className="discover__item">
        <VerticalVideo src={testVideo} autoPlay />
      </SwiperSlide>
      <SwiperSlide id={`discover__item__${1}`} className="discover__item">
        <VerticalVideo src={testHorizontal} />
      </SwiperSlide>
      <SwiperSlide id={`discover__item__${2}`} className="discover__item">
        <VerticalVideo src={testMov} />
      </SwiperSlide>
    </Swiper>
  );
}