import type { PriceProps, PricingProps } from "./pricing.types";

import { Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Button, Grid, Icon, Image } from "mars-ds";

export const Pricing = ({
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
}: PricingProps) => {
  const cn = cx("pricing", className, css(colorSchemaToSx(colorSchema)), css(sx));

  const img = typeof image === "string" ? { src: image } : image;

  return (
    <div className={cn} {...props}>
      {label ? <Text className="pricing__label">
        {label}
      </Text> : null}
      {img ? <Image className="pricing__image" {...img} /> : null}
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
};

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

const colorSchemaToSx = (tokens: Record<string, string>) => Object.entries(tokens).reduce(
  (acc, [key, value]) => ({ ...acc, [`--pricing-${key}`]: value }),
  {}
);
