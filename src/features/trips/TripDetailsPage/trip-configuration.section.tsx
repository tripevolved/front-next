import { CardHighlight, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Icon } from "mars-ds";

export const TripConfigurationSection = ({
  dates,
  period,
  budget,
}: TripDetailsProps["configuration"]) => {
  return (
    <CardHighlight className="trip-configuration">
      <Feature iconName="calendar">{dates.replace(".", "")}</Feature>
      <Feature iconName="clock">{period}</Feature>
      <Feature iconName="dollar-sign">{formatToCurrencyBR(budget)}</Feature>
      {/* <Button iconName="edit-2" size="sm" variant="neutral" disabled>Editar</Button> */}
    </CardHighlight>
  );
};

interface IconFeatureProps {
  iconName: string;
  children: React.ReactNode;
}

const Feature = ({ iconName, children }: IconFeatureProps) => {
  return (
    <div className="trip-configuration__feature">
      <Icon name={iconName} className="color-primary" />
      <Text as="h3" size="md" className="">
        {children}
      </Text>
    </div>
  );
};
