import type { CardTripProps } from "./card-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Link } from "mars-ds";
import { Picture, Text } from "@/ui";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1514454529242-9e4677563e7b?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function CardTrip({
  className,
  children,
  title,
  subtitle,
  header,
  href,
  image = DEFAULT_IMAGE,
  sx,
  ...props
}: CardTripProps) {
  const cn = makeCn("card-trip", className)(sx);

  return (
    <Link href={href} className={cn} {...props}>
      <Picture className="card-trip__image">{image}</Picture>
      {header ? <div className="card-trip__header">{header}</div> : null}
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
