import type { DiscoverProps } from "./discover.types";
import { VerticalVideo } from "@/ui/components/multimedia/VerticalVideo";
import testVideo from '/videos/test.mp4';
import testHorizontal from "/videos/test_horizontal.mp4";
import testMov from "/videos/test2.mov";

import { Swiper, SwiperSlide } from 'swiper/react';
import { } from 'swiper/modules';

export function Discover({  }: DiscoverProps) {
  return (
    <Swiper
      direction={"vertical"}
      className="discover">
      <SwiperSlide className="discover__item">
        <VerticalVideo src={testVideo} />
      </SwiperSlide>
      <SwiperSlide className="discover__item">
        <VerticalVideo src={testHorizontal} />
      </SwiperSlide>
      <SwiperSlide className="discover__item">
        <VerticalVideo src={testMov} />
      </SwiperSlide>
    </Swiper>
  );
}