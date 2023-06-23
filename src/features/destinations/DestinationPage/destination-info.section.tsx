import { CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { DestinationProps } from "./destination-page.types";
import { PublicDestinationFeature } from "@/core/types";
import { Avatar } from "mars-ds";

interface DestinationInfoSectionProps
  extends Pick<DestinationProps, "features" | "recommendedBy"> {}

const recommentaion: DestinationProps["recommendedBy"] = {
  name: "Debora Heppi",
  photo: "https://fakeimg.pl/300/",
  recommendationText:
    "Ouro Preto possui uma história riquíssima e conta com o maior conjunto de arquitetura barroca do Brasil. Cultura a cada passo!",
  social: [],
};

export const DestinationInfoSection = ({
  features,
  recommendedBy,
}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: 20 }}>
      <DestinationInfoFeatures features={features} />
      {/*recommendedBy && <DestinationInfoRecommendedBy {...recommendedBy} />*/}
      <DestinationInfoRecommendedBy {...recommendedBy} />
    </SectionBase>
  );
};

const DestinationInfoFeatures = ({ features = [] }: Pick<DestinationProps, "features">) => {
  return (
    <CardHighlight className="destination-feature__list">
      <Text as="h2" heading className="mb-sm" size="xs">
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
    <div className="destination-feature__list__item">
      <div className="destination-feature__list__item__icon">
        <FeatureIcon name={type} />
      </div>
      <div className="destination-feature__list__item__content">
        <Text as="h3" size="lg" className="destination-feature__list__item__title">
          {title}
        </Text>
        <Text className="destination-feature__list__item__description">{description}</Text>
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

const DestinationInfoRecommendedBy = ({
  photo,
  name,
  recommendationText,
}: DestinationProps["recommendedBy"] = recommentaion) => {
  return (
    <div className="recommendation">
      <div className="flex gap-xl align-items-center mb-xl">
        <Avatar name={name} size="xl" thumbnail={photo} />
        <div className="recommendation__info">
          <Text as="strong" className="my-0 color-primary">
            Destino indicado por
          </Text>
          <Text size="xl" as="h4" style={{ margin: 0 }}>
            {name}
          </Text>
        </div>
      </div>
      <Text className="recommendation__text color-text-secondary">{recommendationText}</Text>
    </div>
  );
};
