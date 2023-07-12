import { Box, CardHighlight, Text } from "@/ui";
import { FeatureIcon } from "@/ui";
import { TripScriptAction } from "@/core/types";

interface TripScriptActionSectionProps {
  action: TripScriptAction;
}

export const TripScriptActionSection = ({ action }: TripScriptActionSectionProps) => {
  return (
    <CardHighlight className="trip-script-action" style={{ padding: "17px 10px" }}>
      <FeatureIcon name={action.iconSlug} />
      <Box className="trip-script-action__box">
        <Text size="lg" className="trip-script-action__title">
          {action.title}
        </Text>
        <Text size="md" className="trip-script-action__subtitle">
          {action.subtitle}
        </Text>
      </Box>
    </CardHighlight>
  );
};
