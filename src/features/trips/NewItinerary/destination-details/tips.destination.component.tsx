import { TripDetails } from "@/core/types";
import { DestinationTipItem } from "@/features/destinations/DestinationPage";
import { Text } from "@/ui";
export const TipsDestination = ({ tips }: { tips: TripDetails["destination"]["tips"] }) => {
  if (tips.length === 0) {
    return <></>;
  }

  return (
    <div>
      <Text variant="heading">Dicas do destino</Text>
      {tips.map((tip) => {
        return <DestinationTipItem key={tip.title} {...tip} />;
      })}
    </div>
  );
};
