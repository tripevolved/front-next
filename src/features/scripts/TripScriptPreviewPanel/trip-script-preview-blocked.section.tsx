import { Box, Text, Picture } from "@/ui";
import { Card } from "mars-ds";

export const TripScriptPreviewBlockedSection = () => {
  return (
    <div className="trip-script-preview-blocked-section">
      <Card className="trip-script-preview-blocked-section__box">
        <Picture src={"/assets/script/lock.svg"} />
        <Text className="trip-script-preview-blocked-section__box__text" heading size="xs">
          {"Prossiga para o pagamento para ter acesso ao roteiro completo"}
        </Text>
      </Card>
    </div>
  );
};
