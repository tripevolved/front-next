import { Box, CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";

interface TripConfigurationSectionProps extends Pick<TripDetailsProps, "configuration"> {}

const config: TripConfigurationSectionProps["configuration"] = {
  dates: "20 a 25 Ago",
  budget: "Até R$ 5mil",
  period: "5 dias",
};

export const TripConfigurationSection = ({
  configuration = config,
}: TripConfigurationSectionProps) => {
  return (
    configuration && (
      <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: "22px 15px" }}>
        <CardHighlight className="trip-configuration" style={{ padding: "17px 10px" }}>
          <Box className="trip-configuration__box">
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.dates}
            </Text>
          </Box>
          <Box className="trip-configuration__box">
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.period}
            </Text>
          </Box>
          <Box className="trip-configuration__box">
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.budget}
            </Text>
          </Box>
          <Box>
            <FeatureIcon name="food" />
            Editar
          </Box>
        </CardHighlight>
      </SectionBase>
    )
  );
};

const FEATURE_ICON_SIZE = 12;
const FeatureIcon = ({ name = "" }) => {
  return (
    <Picture
      src={`/assets/emojis/${name}.png`}
      height={FEATURE_ICON_SIZE}
      width={FEATURE_ICON_SIZE}
    />
  );
};
