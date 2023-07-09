import { Box, CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";
import { formatByDataType } from "@/utils/helpers/number.helpers";

interface TripConfigurationSectionProps extends Pick<TripDetailsProps, "configuration"> {}

export const TripConfigurationSection = ({ configuration }: TripConfigurationSectionProps) => {
  return (
    configuration && (
      <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: "22px 15px" }}>
        <CardHighlight className="trip-configuration-section" style={{ padding: "17px 10px" }}>
          <Box className="trip-configuration-section__box">
            <FeatureIcon name="calendar" />
            <Text as="h2" size="md" className="trip-configuration-section__text">
              {configuration.dates}
            </Text>
          </Box>
          <Box className="trip-configuration-section__box">
            <FeatureIcon name="time" />
            <Text as="h2" size="md" className="trip-configuration-section__text">
              {configuration.period}
            </Text>
          </Box>
          <Box className="trip-configuration-section__box">
            <FeatureIcon name="cash" />
            <Text as="h2" size="md" className="trip-configuration-section__text">
              {formatByDataType(configuration.budget, "CURRENCY")}
            </Text>
          </Box>
          <Box className="trip-configuration-section__box-text">
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
