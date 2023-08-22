import { PublicDestinationFeature } from "@/core/types";
import { CardHighlight, Picture, Text } from "@/ui";

interface DestinationInfosProps {
  features: PublicDestinationFeature[]
}

export const DestinationInfos = ({ features = [] }: DestinationInfosProps) => {

  return (
    <CardHighlight className="destination-infos">
      <Text as="h2" heading className="mb-sm" size="xs">
        Destaques do destino
      </Text>
      {features.map((props, key) => (
        <DestinationInfosItem key={key} {...props} />
      ))}
    </CardHighlight>
  );
}

const DestinationInfosItem = ({ title, description, type }: PublicDestinationFeature) => {
  return (
    <div className="destination-infos-item">
      <div className="destination-infos-item__icon">
        <FeatureIcon name={type} />
      </div>
      <div className="destination-infos-item__content">
        <Text as="h3" size="lg" className="destination-infos-item__title">
          {title}
        </Text>
        <Text className="destination-infos-item__description">{description}</Text>
      </div>
    </div>
  );
};

const FEATURE_ICON_SIZE = 23;
const FeatureIcon = ({ name = "" }) => {
  return (
    <Picture
      src={`/assets/emojis/${name}.png`}
      height={FEATURE_ICON_SIZE}
      width={FEATURE_ICON_SIZE}
    />
  );
};
