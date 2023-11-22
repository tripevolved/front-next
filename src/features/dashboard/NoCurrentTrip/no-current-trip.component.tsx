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
      <section className="py-lg">
        <DestinationsByProfileName profileName={travelerProfile || "relax"} enableNewTrip />
      </section>
    </section>
  );
}
