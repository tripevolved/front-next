import { Box, CardHighlight, Picture, SectionBase, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";

interface TripConfigurationSectionProps extends Pick<TripDetailsProps, "configuration"> {}

const config: TripConfigurationSectionProps["configuration"] = {
  dates: "",
  budget: "",
  period: "",
};

export const TripConfigurationSection = ({
  configuration = config,
}: TripConfigurationSectionProps) => {
  return (
    configuration && (
      <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: 15 }}>
        <CardHighlight
          className="trip-configuration"
          style={{
            border: "1px dashed #0AB9AD",
            backgroundColor: "#EEFBFA",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box style={{ display: "flex" }}>
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__date">
              {/* {configuration.dates} */}20 a 25 Ago
            </Text>
          </Box>
          <Box style={{ display: "flex" }}>
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__date">
              {/* {configuration.period} */}5 dias
            </Text>
          </Box>
          <Box style={{ display: "flex" }}>
            <FeatureIcon name="food" />
            <Text as="h2" size="md" className="trip-configuration__date">
              {/* {configuration.budget} */}Até R$5mil
            </Text>
          </Box>
          <Box>
            <FeatureIcon name="food" />
            EDITAR
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
