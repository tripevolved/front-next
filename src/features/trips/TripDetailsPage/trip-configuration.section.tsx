import { CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";

interface TripConfigurationSectionProps
  extends Pick<TripDetailsProps, "configuration"> {}

export const TripConfigurationSection = ({
  configuration
}: TripConfigurationSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32}>
      <CardHighlight className="trip-configuration">
        <FeatureIcon name="generic" />
        <Text as="h3" heading size="xs" className="trip-configuration__date">
          {/* {configuration.dates} */}20 a 25 Ago
        </Text>
        <FeatureIcon name="generic" />
        <Text as="h3" heading size="xs" className="trip-configuration__date">
          {/* {configuration.period} */}5 dias
        </Text>
        <FeatureIcon name="generic" />
        <Text as="h3" heading size="xs" className="trip-configuration__date">
          {/* {configuration.budget} */}Até R$5mil
        </Text>
        <FeatureIcon name="generic" />
        EDITAR
      </CardHighlight>
    </SectionBase>
  );
};

const FEATURE_ICON_SIZE = 12;
const FeatureIcon = ({ name = "" }) => {
  return <Picture src={`/assets/emojis/${name}.png`} height={FEATURE_ICON_SIZE} width={FEATURE_ICON_SIZE} />;
};