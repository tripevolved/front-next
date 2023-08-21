import type { CardTripProps } from "./card-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Link } from "mars-ds";
import { Picture, Text } from "@/ui";

export function CardTrip({ className, children, title, subtitle, header, href, image, sx, ...props }: CardTripProps) {
  const cn = makeCn("card-trip", className)(sx);

  return (
    <Link href={href} className={cn} {...props}>
      {image ? <Picture className="card-trip__image">{image}</Picture> : null}
      {header ? (
        <div className="card-trip__header">{header}</div>
      ) : null}
      <div className="card-trip__content">
        {title ? (
          <div>
            <Text as="h3" heading size="xs">
              <strong>{title}</strong>
            </Text>
            {subtitle ? <Text size="xs">{subtitle}</Text> : null}
          </div>
        ) : null}
        {children}
      </div>
    </Link>
  );
}
