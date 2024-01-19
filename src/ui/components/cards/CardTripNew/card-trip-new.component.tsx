import { Button, Link } from "mars-ds";
import { HoverTooltipCard, IconCustom } from "@/ui";
import type { CardTripNewProps } from "./card-trip-new.types";
import { useAppStore } from "@/core/store";

export const CardTripNew = ({ href, iconName, title }: CardTripNewProps) => {
  const { availableFeatures } = useAppStore((state) => state.travelerState);
  const enableNewTrip = false; //availableFeatures.includes("ITINERARY");

  const childrenComponent = (
    <div className="card-trip-new__content">
      <div className="card-trip-new__image">
        <IconCustom name={iconName} />
      </div>
      <Button href={href} variant="neutral" iconName={enableNewTrip ? "plus" : "lock"} size="sm" disabled={!enableNewTrip}>
        {title}
      </Button>      
    </div>);

  return enableNewTrip ? (
    <Link href={href} className="card-trip card-trip-new">
      {childrenComponent}
    </Link>
  ) : (
    <div className="card-trip card-trip-new">
      <HoverTooltipCard text="Essa funcionalidade ainda não está habilitada para você. Fale conosco e vamos ajudar a construir sua trip!">{childrenComponent}</HoverTooltipCard>
    </div>
  );
};