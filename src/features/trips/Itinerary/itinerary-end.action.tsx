import { Picture, Text } from "@/ui";

export const ItineraryEnd = () => {
  return (
    <div className=" itinerary__item">
      <div className="flex flex-column gap-md py-lg ml-xl">
        <div className="flex flex-row gap-xl">
          <Picture src={`/assets/destino/map_blue.svg`} style={{ width: 40 }} />
          <Text as="h3" heading size="xs" className="my-auto">
            <strong>Roteiro Completo</strong>
          </Text>
        </div>
      </div>
    </div>
  );
};
