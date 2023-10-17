import { Box, Text, Picture, TooltipCard } from "@/ui";
import { ComponentHTMLProps, TripScriptAction } from "@/core/types";
import { Grid } from "mars-ds";

interface TripScriptActionSectionProps extends ComponentHTMLProps {
  action: TripScriptAction;
  onClick?: () => void;
}

export const TripScriptActionSection = ({
  action,
  children,
  onClick,
}: TripScriptActionSectionProps) => {
  return (
    <Grid className="trip-script-action" gap={6} columns={children ? [2,11,1] : [2,12]} onClick={onClick} style={onClick && {cursor: "pointer"}}>
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
      {children}
    </Grid>
  );
};
