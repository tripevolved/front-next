import { CardHighlight, Text } from "@/ui";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Icon, Button, Modal, Grid } from "mars-ds";
import { TripEditConfiguration } from "../TripEditConfiguration";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import type { TripConfiguration } from "@/core/types";

interface TripConfigurationSectionProps extends TripConfiguration {
  tripId: string;
  isBuilding: boolean;
}

export const TripConfigurationSection = (props: TripConfigurationSectionProps) => {
  const openModalEdition = () => {
    Modal.open(() => <TripEditConfiguration {...props} />, { closable: true });
  };

  if (props.isBuilding)
    return (
      <CardHighlight
        variant="warning"
        heading="Sua trip está sendo reconstruída"
        text="Ainda não será possível realizar a edição da sua viagem. Aguarde, por favor."
        style={{ padding: 12, paddingLeft: 24 }}
      />
    );

  return (
    <CardHighlight variant="default" style={{ padding: 12 }}>
      <Grid columns={["1fr", "auto"]}>
        <div className="flex gap-lg justify-content-between flex-wrap">
          <Feature iconName="calendar">{normalizeDateString(props.formattedDates)}</Feature>
          <Feature iconName="clock">{props.period}</Feature>
          <Feature iconName="dollar-sign">{formatToCurrencyBR(props.budget)}</Feature>
        </div>
        <div className="text-right" style={{ minWidth: 100 }}>
          <Button iconName="edit-2" size="sm" variant="neutral" onClick={openModalEdition}>
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
    <Grid columns={["auto", "1fr"]} gap={12} className="align-items-center">
      <Icon name={iconName} className="color-primary" />
      <Text as="h3" size="md">
        {children}
      </Text>
    </Grid>
  );
};
