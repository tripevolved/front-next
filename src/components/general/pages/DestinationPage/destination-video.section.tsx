import type { PublicDestinationVideo } from "@/types";
import type { DestinationProps } from "./destination-page.types";

import { CardYoutube, SectionBase, Text } from "@/components";
import { Label, LabelVariants } from "mars-ds";

interface DestinationVideoSectionProps extends Pick<DestinationProps, "videos" | "title"> {}

export const DestinationVideoSection = ({ title, videos }: DestinationVideoSectionProps) => {
  const [video] = videos;
  return (
    <SectionBase container="md" className="destination-video-section">
      <Text heading className="mb-xl destination-video-section__heading">
        Top 5: Lugares mais incríveis de {title}
      </Text>
      <DestinationVideo {...video} />
    </SectionBase>
  );
};

const DestinationVideo = ({ source }: PublicDestinationVideo) => {
  return (
    <div className="destination-video">
      <Label variant={LabelVariants.Warning} className="destination-video__tag">Disponível para assinantes</Label>
      <CardYoutube videoId={source} elevation="none" />
    </div>
  );
};
