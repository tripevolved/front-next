import { Box, Picture, Text, TooltipCard } from "@/ui";
import { TripScriptAction } from "@/core/types";
import { Card } from "mars-ds";

interface TripScriptPreviewActionSectionProps {
  action: TripScriptAction;
}

export const TripScriptPreviewActionSection = ({ action }: TripScriptPreviewActionSectionProps) => {
  return (
    <Card className="trip-script-preview-action" elevation="xl">
      <Picture
        className="trip-script-preview-action__icon"
        src={`/assets/script/${action.iconSlug}.svg`}
      />
      <Box className="trip-script-preview-action__box">
        <Text size="lg" className="trip-script-preview-action__title">
          {action.title}
          {action.tooltip && <TooltipCard text={action.tooltip} />}
        </Text>
        <Text size="md" className="trip-script-preview-action__subtitle">
          {action.subtitle}
        </Text>
      </Box>
    </Card>
  );
};
