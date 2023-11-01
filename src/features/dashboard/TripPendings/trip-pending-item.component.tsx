import { ItemButton, ItemButtonProps, LabelThemes, LabelVariants } from "mars-ds";
import { TripPendingItemProps } from "./trip-pendings.types";

export const TripPendingItem = ({
  slug,
  title,
  tripId,
  description,
  isMandatory,
}: TripPendingItemProps) => {
  const getIconAndName = (slug: TripPendingItemProps["slug"]): ItemButtonProps => {
    const href = `/app/viagens/${tripId}/pendencias/${slug}`;

    if (slug === "viajantes")
      return {
        iconName: "users",
        title: title || "Viajantes",
        subtitle: description || "Informe os dados dos viajantes",
        href,
        label: isMandatory ? "Importante" : undefined,
        labelVariant: isMandatory ? LabelVariants.Warning : undefined,
        labelTheme: LabelThemes.Ghost,
      };

    return {
      iconName: "alert-circle",
      title,
      subtitle: description,
      href,
      label: isMandatory ? "Importante" : undefined,
      labelVariant: isMandatory ? LabelVariants.Warning : undefined,
      labelTheme: LabelThemes.Ghost,
    };
  };

  return <ItemButton {...getIconAndName(slug)} />;
};
