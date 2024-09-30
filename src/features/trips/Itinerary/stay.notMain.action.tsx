import { TripStaySimplified } from "@/core/types";
import { CardHighlight, Text } from "@/ui";
import { Button } from "mars-ds";

interface Props {
  action: TripStaySimplified;
  showDetails: () => void;
}
export const StayNotMain = ({ action, showDetails }: Props) => {
  return (
    <CardHighlight className="my-sm">
      <div className="flex" style={{ alignItems: "start", justifyContent: "space-between" }}>
        <div>
          <Text variant="heading">{`Sua hospedagem em ${action.from}`}</Text>
          <span>{action.message}</span>
        </div>
        <Button
          variant="neutral"
          size="sm"
          style={{
            border: "none",
            textDecoration: "underline",
            alignSelf: "flex-start",
            padding: 0,
            fontWeight: 500,
          }}
          onClick={showDetails}
        >
          Ver Detalhes
        </Button>
      </div>
    </CardHighlight>
  );
};
