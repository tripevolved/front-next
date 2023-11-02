import { ItemButton, LabelThemes, LabelVariants } from "mars-ds";
import { TripPendingItemProps } from "./trip-pendings.types";

export const TripPendingItem = ({
  slug,
  title,
  tripId,
  description,
  isMandatory,
}: TripPendingItemProps) => {
  const commonProps = {
    href: `/app/viagens/${tripId}/pendencias/${slug}`,
    label: isMandatory ? "Importante" : undefined,
    labelVariant: isMandatory ? LabelVariants.Warning : undefined,
    labelTheme: LabelThemes.Ghost,
  };

  if (slug === "viajantes") {
    return (
      <ItemButton
        iconName="users"
        title={title || "Viajantes"}
        subtitle={description || "Informe os dados dos viajantes"}
        {...commonProps}
      />
    );
  }

  return (
    <ItemButton iconName="alert-circle" title={title} subtitle={description} {...commonProps} />
  );
};
