import type { PublicDestinationExpert } from "@/core/types";
import { Text } from "@/ui";
import { Avatar } from "mars-ds";

export const DestinationRecommendedBy = ({
  photo,
  name,
  recommendationText,
}: PublicDestinationExpert) => {
  return (
    <div className="recommendation">
      <div className="flex gap-xl align-items-center mb-xl">
        <Avatar name={name} size="xl" thumbnail={photo} />
        <div className="recommendation__info">
          <Text as="strong" className="my-0 color-primary">
            Destino indicado por
          </Text>
          <Text size="xl" as="h4" style={{ margin: 0 }}>
            {name}
          </Text>
        </div>
      </div>
      {recommendationText ? (
        <Text className="recommendation__text color-text-secondary">
          &quot;{recommendationText}&quot;
        </Text>
      ) : null}
    </div>
  );
};
