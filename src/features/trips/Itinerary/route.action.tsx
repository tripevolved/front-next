import { Picture, Text } from "@/ui";
import { TripTransportation } from "@/core/types";

export const RouteAction = ({ action }: { action: TripTransportation }) => {
  return (
    <div className="flex flex-column gap-md py-lg ml-xl">
      <div className="flex flex-row gap-xl">
        <Picture src={`/assets/destino/carro.svg`} style={{ width: 40 }} />
        <Text as="h3" heading size="xs" className="my-auto">
          <strong>Carro</strong>
        </Text>
      </div>
      <div className="flex flex-row pl-20" style={{ left: 60 }}>
        <div className="flex flex-row gap-xl">
          <div style={{ width: 54 }} />
          <div>
            <Text as="p" size="xs" style={{ fontWeight: "normal" }}>
              <p>
                {`Trajeto de ${action.fromName} a ${action.toName}`}.<br />
                {action.description}
              </p>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
