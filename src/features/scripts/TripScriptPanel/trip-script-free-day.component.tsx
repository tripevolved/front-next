import { Grid, Icon, Text } from "mars-ds";
import { Box } from "@/ui";

export const TripScriptFreeDay = () => {
  return (
    <Grid className="trip-script-action">
      <div className="trip-script-action__icon-box">
        <Icon name="home" size="sm" />
      </div>
      <Box className="trip-script-action__box">
        <Text size="lg" className="trip-script-action__title">
          Você tem o dia livre para aproveitar como quiser!
        </Text>
      </Box>
    </Grid>
  );
};