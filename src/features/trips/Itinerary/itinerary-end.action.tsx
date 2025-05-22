import { Picture, Text } from "@/ui";
import { Button } from "mars-ds";

interface ItineraryEndProps {
  tripDescription?: string;
  handlePreviewScript?: () => void;
}

export const ItineraryEnd = ({ tripDescription, handlePreviewScript }: ItineraryEndProps) => {
  return (
    <div className=" itinerary__item">
      <div className="flex flex-column gap-md py-lg ml-xl">
        <div className="flex flex-row gap-xl">
          <Picture src={`/assets/destino/map_blue.svg`} style={{ width: 40 }} />
          <Text as="h3" heading size="xs" className="my-auto">
            <strong>Roteiro </strong>
          </Text>
        </div>
        <Text>{tripDescription ?? "lorem"}</Text>
        <Button
          variant="neutral"
          size="md"
          style={{
            border: "none",
            textDecoration: "underline",
            padding: 0,
            alignSelf: "flex-start",
            fontWeight: 500,
          }}
          onClick={handlePreviewScript}
        >
          Ver prévia do roteiro
        </Button>
      </div>
    </div>
  );
};
