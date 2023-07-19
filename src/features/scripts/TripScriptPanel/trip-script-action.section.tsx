import { Box, CardHighlight, Text, Picture } from "@/ui";
import { TripScriptAction } from "@/core/types";
import { Card, Icon } from "mars-ds";

interface TripScriptActionSectionProps {
  action: TripScriptAction;
}

export const TripScriptActionSection = ({ action }: TripScriptActionSectionProps) => {
  return (
    <Card className="trip-script-action" elevation="xl">
      <Picture className="trip-script-action__icon" src={`/assets/script/${action.iconSlug}.svg`} />
      <Box className="trip-script-action__box">
        <Text size="lg" className="trip-script-action__title">
          {action.title}
        </Text>
        <Text size="md" className="trip-script-action__subtitle">
          {action.subtitle}
        </Text>
      </Box>
    </Card>
  );
};
