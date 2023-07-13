import { useAppStore } from "@/core/store";
import { DestinationsByProfileName } from "@/features";
import { Text } from "@/ui";
import { Button } from "mars-ds";

export function NoCurrentTrip() {
  const { travelerProfile } = useAppStore((state) => state.travelerState);

  return (
    <section className="no-current-trip">
      <Text heading size="xs" className="color-primary">
        Destinos que você pode gostar:
      </Text>
      <div className="no-current-trip__destinations py-lg">
        <DestinationsByProfileName profileName={travelerProfile || "relax"} />
      </div>
      <Button href="/app/viagens/criar">Quero uma viagem personalizada</Button>
    </section>
  );
}
