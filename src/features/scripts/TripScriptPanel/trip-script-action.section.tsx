import { Box, Text, Picture, TooltipCard } from "@/ui";
import { TripScriptAction } from "@/core/types";
import { Card, Icon } from "mars-ds";

interface TripScriptActionSectionProps {
  action: TripScriptAction;
  isEditPage?: boolean;
  onClick?: () => void;
}

export const TripScriptActionSection = ({
  action,
  isEditPage = false,
  onClick,
}: TripScriptActionSectionProps) => {
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
      {action.tooltip && <TooltipCard text={action.tooltip} className="trip-script-action__title__tooltip" />}
      {isEditPage && onClick && (
        <Icon
          name="trash-2"
          color="#D35050"
          onClick={() => onClick()}
          style={{ justifySelf: "flex-end", alignSelf: "center", marginLeft: "auto" }}
        />
      )}
    </Card>
  );
};
