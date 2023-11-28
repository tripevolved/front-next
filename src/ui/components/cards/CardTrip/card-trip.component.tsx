import type { CardTripProps } from "./card-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Link } from "mars-ds";
import { Picture, Text } from "@/ui";
import { DEFAULT_CARD_IMAGE_URL } from "@/core/constants";

export function CardTrip({
  className,
  children,
  title,
  subtitle,
  header,
  href,
  image = DEFAULT_CARD_IMAGE_URL,
  sx,
  ...props
}: CardTripProps) {
  const cn = makeCn("card-trip", { "card-trip--is-link": !!href }, className)(sx);
  const Component = href ? Link : "div";
  return (
    <Component href={href} className={cn} {...props}>
      <Picture className="card-trip__image">{image}</Picture>
      {header ? <div className="card-trip__header">{header}</div> : null}
      <div className="card-trip__content">
        {title ? (
          <div>
            <Text as="h3" heading size="xs">
              <strong>{title}</strong>
            </Text>
            {subtitle ? <Text size="sm">{subtitle}</Text> : null}
          </div>
        ) : null}
        {children}
      </div>
    </Component>
  );
}
