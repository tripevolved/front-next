import { Box, Text, Picture, TooltipCard } from "@/ui";
import { TripScriptAction } from "@/core/types";
import { Card, Grid, Icon } from "mars-ds";

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
  const shouldShowTrash = isEditPage && onClick;

  return (
    <Grid className="trip-script-action" gap={6} columns={shouldShowTrash ? [2,11,1] : [2,12]}>
      <Picture className="trip-script-action__icon" src={action.image ? action.image : `/assets/script/${action.iconSlug}.svg`} />
      <Box className="trip-script-action__box">
        <Text size="md" className="trip-script-action__title">
          {action.title}
        </Text>
        {action.tooltip && <TooltipCard text={action.tooltip} className="trip-script-action__title__tooltip" />}
        <Text size="sm" className="trip-script-action__subtitle">
          {action.subtitle}
        </Text>
      </Box>
      {shouldShowTrash && (
        <Icon
          name="trash-2"
          color="#D35050"
          onClick={() => onClick()}
          style={{ justifySelf: "flex-end", alignSelf: "center", marginLeft: "auto" }}
        />
      )}
    </Grid>
  );
};
