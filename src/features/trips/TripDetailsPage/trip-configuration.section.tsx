import { CardHighlight, Text } from "@/ui";
import { TripDetailsProps } from "./trip-details-page.types";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Icon, Button, Modal, Grid } from "mars-ds";
import { TripEditConfiguration } from "../TripEditConfiguration";

export const TripConfigurationSection = ({
  dates,
  period,
  budget,
  tripId,
}: TripDetailsProps["configuration"] & { tripId: string }) => {
  const handleButton = () => {
    Modal.open(() => <TripEditConfiguration tripId={tripId} />, {
      size: "md",
      closable: true,
    });
  };

  return (
    <CardHighlight variant="default">
      <Grid columns={{ sm: ["1fr", "200px"]}}>
        <div className="flex gap-lg justify-content-between flex-wrap">
          <Feature iconName="calendar">{dates.replace(".", "")}</Feature>
          <Feature iconName="clock">{period}</Feature>
          <Feature iconName="dollar-sign">{formatToCurrencyBR(budget)}</Feature>
        </div>
        <div className="text-right" style={{ minWidth: 150 }}>
          <Button iconName="edit-2" size="sm" variant="neutral" onClick={handleButton}>
            Editar
          </Button>
        </div>
      </Grid>
    </CardHighlight>
  );
};

interface IconFeatureProps {
  iconName: string;
  children: React.ReactNode;
}

const Feature = ({ iconName, children }: IconFeatureProps) => {
  return (
    <Grid columns={["auto", "1fr"]} className="align-items-center">
      <Icon name={iconName} className="color-primary" />
      <Text as="h3" size="md">
        {children}
      </Text>
    </Grid>
  );
};
