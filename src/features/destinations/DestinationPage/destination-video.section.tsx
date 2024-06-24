import type { PublicDestinationVideo } from "@/core/types";
import type { DestinationProps } from "./destination-page.types";

import { CardYoutube, SectionBase, Text } from "@/ui";
import { Label, LabelVariants } from "mars-ds";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DestinationVideoSectionProps extends Pick<DestinationProps, "videos" | "title"> {}

export const DestinationVideoSection = ({ title, videos }: DestinationVideoSectionProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <SectionBase container="md" className="destination-video-section">
      <Text heading className="mb-xl destination-video-section__heading">
        Os lugares mais incríveis: {title}
      </Text>
      <Slider {...settings}>
        {videos.map((video, index) => <DestinationVideo key={index} {...video} />)}
      </Slider>
    </SectionBase>
  );
};

const DestinationVideo = ({ source }: PublicDestinationVideo) => {
  return (
    <div className="destination-video">
      {/* <Label variant={LabelVariants.Warning} className="destination-video__tag">Disponível para assinantes</Label> */}
      <CardYoutube videoId={source} elevation="none" />
    </div>
  );
};
