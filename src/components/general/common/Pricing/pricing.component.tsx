import type { PriceProps, PricingProps } from "./pricing.types";

import { Picture, Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Button, Grid, Icon } from "mars-ds";

export function Pricing({
  className,
  children,
  sx,
  heading,
  image,
  features,
  cta,
  colorSchema = {},
  price,
  label,
  ...props
}: PricingProps) {
  const cn = cx("pricing", className, css(colorSchemaToSx(colorSchema)), css(sx));
  return (
    <div className={cn} {...props}>
      {label ? <Text className="pricing__label">{label}</Text> : null}
      {image ? <Picture className="pricing__image">{image}</Picture> : null}
      <Text className="pricing__heading" variant="heading" size="lg">
        {heading}
      </Text>
      <Grid className="pricing__features">
        {features?.map((feature, key) => (
          <div key={key} className="pricing__features__item">
            <Icon name="check-circle" />
            <Text>{feature}</Text>
          </div>
        ))}
      </Grid>
      {price ? <Price {...price} /> : null}
      {children}
      <Button {...cta} />
    </div>
  );
}

const Price = ({ current, old, description, className, children, sx, ...props }: PriceProps) => {
  const cn = cx("price", className, css(sx));

  return (
    <Grid gap={8} className={cn} {...props}>
      <Text as="del">{old}</Text>
      <Text as="div" variant="heading" size="lg">
        {current}
      </Text>
      <Text as="div" size="lg">
        {description}
      </Text>
      {children}
    </Grid>
  );
};

const colorSchemaToSx = (tokens: Record<string, string>) =>
  Object.entries(tokens).reduce(
    (acc, [key, value]) => ({ ...acc, [`--pricing-${key}`]: value }),
    {}
  );
