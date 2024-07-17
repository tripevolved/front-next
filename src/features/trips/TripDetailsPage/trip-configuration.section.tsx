import { CardHighlight, FeatureIcon, Text } from "@/ui";
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
    <CardHighlight variant="default" style={{ padding: 12, backgroundColor: 'rgba(238, 251, 250, 1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <div className="flex gap-lg justify-content-between flex-wrap" style={{ alignItems: "center", flex: 2}}>
          <div>
            <FeatureIcon name="calendar-day" size={20} />
            <label style={{ fontWeight: 700, paddingLeft: 8}}>{normalizeDateString(props.formattedDates)}</label>          </div>
          <div>
          <FeatureIcon name="time" size={20} />
          <label style={{ fontWeight: 700, paddingLeft: 8}}>{props.period}</label>
          </div>
          <div>
          <FeatureIcon name="cash" size={20} />
          <label style={{ fontWeight: 700, paddingLeft: 8}}>{formatToCurrencyBR(props.budget)}</label>
          </div>
        </div>
        <div className="text-right" style={{ minWidth: 100, flex: 1 }}>
          <Button style={{border: 'none'}} size="sm" variant="neutral" onClick={openModalEdition}>
          <FeatureIcon name="pencil" size={20}/>

          <label style={{ fontWeight: 700, paddingLeft: 8}}>Editar</label>
          </Button>
        </div>
      </div>
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
