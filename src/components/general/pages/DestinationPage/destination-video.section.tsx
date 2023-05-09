import { Heading } from "mars-ds";
import CardYoutube from "../../common/CardYoutube/card-youtube.component";
import type { DestinationProps } from "./destination-page.types";
import { SectionBase } from "@/components";

interface DestinationVideoSectionProps extends Pick<DestinationProps, "videos" | "title"> {}

export const DestinationVideoSection = ({ title, videos }: DestinationVideoSectionProps) => {
  return (
    <SectionBase container="md" className="destination-video-section">
      <Heading
        level={5}
        size={"md"}
        html={`Top 5: Lugares mais incríveis de ${title}`}
        className="destination-video-section__title mb-xl pb-md"
      />
      <div className="destination-video-section__card">
        <CardYoutube
          videoId="kSvaiM9Go2Y"
          elevation="none"
          tag={{ text: "Disponível para assinantes" }}
        />
      </div>
    </SectionBase>
  );
};
