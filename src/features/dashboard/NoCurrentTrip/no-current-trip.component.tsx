import { useAppStore } from "@/core/store";
import { DestinationsByProfileName } from "@/features";
import { Text } from "@/ui";
import { Button } from "mars-ds";

export function NoCurrentTrip() {
  const { travelerProfile } = useAppStore((state) => state.travelerState);

  return (
    <section>
      <Text className="mt-lg" as="h2" heading size="xs">
        Destinos que você pode gostar:
      </Text>
      <div className="py-lg">
        <DestinationsByProfileName profileName={travelerProfile || "relax"} />
      </div>
      <Button variant="tertiary" href="/app/viagens/nova">Quero uma viagem personalizada</Button>
    </section>
  );
}
