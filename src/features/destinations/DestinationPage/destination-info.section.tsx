import { CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { DestinationProps } from "./destination-page.types";
import { PublicDestinationFeature } from "@/core/types";
import { Avatar } from "mars-ds";

interface DestinationInfoSectionProps
  extends Pick<DestinationProps, "features" | "recommendedBy"> {}

export const DestinationInfoSection = ({
  features,
  recommendedBy,
}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32}>
      <DestinationInfoFeatures features={features} />
      <DestinationInfoRecommendedBy {...recommendedBy} />
    </SectionBase>
  );
};

const DestinationInfoFeatures = ({ features = [] }: Pick<DestinationProps, "features">) => {
  return (
    <CardHighlight className="destination-features">
      <Text as="h2" heading className="mb-xl">
        Destaques do destino
      </Text>
      {features.map((props, key) => (
        <DestinationFeature key={key} {...props} />
      ))}
    </CardHighlight>
  );
};

const DestinationFeature = ({ title, description, type }: PublicDestinationFeature) => {
  return (
    <div className="destination-feature">
      <div className="destination-feature__icon">
        <FeatureIcon name={type} />
      </div>
      <div className="destination-feature__content">
        <Text as="h3" heading size="xs" className="destination-feature__title">
          {title}
        </Text>
        <Text className="destination-feature__description">{description}</Text>
      </div>
    </div>
  );
};

const FEATURE_ICON_SIZE = 28;
const FeatureIcon = ({ name = "" }) => {
  return <Picture src={`/assets/emojis/${name}.png`} height={FEATURE_ICON_SIZE} width={FEATURE_ICON_SIZE} />;
};

const DestinationInfoRecommendedBy = ({
  photo, name, recommendationText
}: DestinationProps["recommendedBy"]) => {
  return (
    <div className="recommendation">
      <div className="flex gap-xl align-items-center mb-xl">
        <Avatar name={name} size="xl" thumbnail={photo} />
        <div className="recommendation__info">
          <Text as="strong" className="my-0 color-primary">Destino indicado por</Text>
          <Text size="xl" as="h4" style={{ margin: 0 }}>{name}</Text>
        </div>
      </div>
      <Text className="recommendation__text color-text-secondary">{recommendationText}</Text>
    </div>
  )
};
