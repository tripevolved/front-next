import { ItemButton, Label, LabelThemes, LabelVariants, Modal } from "mars-ds";
import { TripTipItemProps } from "./trip-tips.types";
import { Box, Text } from "@/ui";

export const TripTipItem = ({
  title,
  type,
  subtitle,
  details,
  tripId,
}: TripTipItemProps) => {
  const isAlert = type === "ALERT";
  const isRestaurant = type === "RESTAURANT";
  const isAttraction = type === "ATTRACTION";
  const isInformation = type === "INFORMATION";

  const labelVariant = isAlert ? LabelVariants.Warning : undefined;
  const labelText = isAlert ? "Importante" : undefined;

  // TODO: create specific delivery for restaurant and attractions with image instead of icon, as in the docs

  const commonProps = {
    onClick: () => {
      Modal.open(
        () => (
          <Box>
            <Text heading>{title}</Text>
            {labelText && <Label variant={labelVariant}>{labelText}</Label>}
            <Text size="sm">{subtitle}</Text>
            <Text size="lg">{details}</Text>
          </Box>
        ),
        { closable: true, size: "sm" }
      );
    },
    label: labelText,
    labelVariant: labelVariant,
    labelTheme: LabelThemes.Ghost,
    iconName: isAlert ? "alert-circle" 
      : (isInformation ? "comment" : undefined)
  };

  return (
    <ItemButton title={title} subtitle={subtitle ?? ""} {...commonProps} />
  );
};
