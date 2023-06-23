import { Box, CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";

interface TripConfigurationSectionProps extends Pick<TripDetailsProps, "configuration"> {}

export const TripConfigurationSection = ({ configuration }: TripConfigurationSectionProps) => {
  return (
    configuration && (
      <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: "22px 15px" }}>
        <CardHighlight className="trip-configuration" style={{ padding: "17px 10px" }}>
          <Box className="trip-configuration__box">
            <FeatureIcon name="calendar" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.dates}
            </Text>
          </Box>
          <Box className="trip-configuration__box">
            <FeatureIcon name="time" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.period}
            </Text>
          </Box>
          <Box className="trip-configuration__box">
            <FeatureIcon name="cash" />
            <Text as="h2" size="md" className="trip-configuration__text">
              {configuration.budget}
            </Text>
          </Box>
          <Box className="trip-configuration__box-text">
            <FeatureIcon name="pencil" />
            Editar
          </Box>
        </CardHighlight>
      </SectionBase>
    )
  );
};

const FEATURE_ICON_SIZE = 15;
const FeatureIcon = ({ name = "" }) => {
  return (
    <Picture
      src={`/assets/trip/${name}.svg`}
      height={FEATURE_ICON_SIZE}
      width={FEATURE_ICON_SIZE}
    />
  );
};
