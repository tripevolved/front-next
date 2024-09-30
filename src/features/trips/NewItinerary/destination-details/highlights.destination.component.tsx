import { TripDetails } from "@/core/types";
import { CardHighlight, FeatureIcon, Picture, Text } from "@/ui";

export const HighlightsDestination = ({
  features,
}: {
  features: TripDetails["destination"]["features"];
}) => {
  if (features.length === 0) {
    return <></>;
  }

  return (
    <CardHighlight variant="info" heading="Destaques do destino">
      <div className="flex flex-column gap-md mt-md">
        {features.map((feature) => {
          return (
            <div key={feature.title} className="flex flex-column mt-sm">
              <div className="flex flex-row gap-md">
                <Picture src={`/assets/emojis/${feature.type}.png`} height={24} width={24} />
                <Text
                  variant="heading"
                  size="sm"
                  style={{ paddingTop: 0, color: "var(--color-brand-4" }}
                >
                  {feature.title}
                </Text>
              </div>
              <Text style={{ marginLeft: 36 }}>{feature.description}</Text>
            </div>
          );
        })}
      </div>
    </CardHighlight>
  );
};
