import { Link } from "mars-ds";
import { IconCustom, Text } from "@/ui";
import type { CardTripNewProps } from "./card-trip-new.types";

export const CardTripNew = ({ href, iconName, title }: CardTripNewProps) => {
  return (
    <Link href={href} className="card-trip card-trip-new">
      <div className="card-trip-new__content">
        <div className="card-trip-new__image">
          <IconCustom name={iconName} />
        </div>
        <Text size="lg">{title}</Text>
      </div>
    </Link>
  );
};
